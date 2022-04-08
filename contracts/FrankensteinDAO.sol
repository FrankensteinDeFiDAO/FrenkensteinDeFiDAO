// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IFocusPool.sol";
import "./interfaces/IRobot.sol";

contract FrankensteinDAO {
    IFocusPool pool;

    opType[] public proposals;

    struct opType {
        uint8 op;
        uint[] parameters;
        uint yesVotes;
        uint deadlineBlock;
        mapping(address => uint) voted;
    }

    constructor(IFocusPool _pool) {
        pool = _pool;
    }

    function propose(uint8 op, uint deadlineBlock, uint[] memory parameters) external returns (uint proposalId) {
        require(pool.balanceOf(msg.sender) > 0, "FrankensteinDAO: NOT_A_MEMBER"); // Must have liquidity in pool
        proposalId = proposals.length;
        proposals.push();
        if (0 == op) { // setSwapFee(uint16 _fee)
            proposals[proposalId].op == 0;
            proposals[proposalId].parameters.push(parameters[0]);
            proposals[proposalId].deadlineBlock = deadlineBlock;
        } else if (1 == op) { // shiftRange(uint256 _priceShiftFactor)
            proposals[proposalId].op == 1;
            proposals[proposalId].parameters.push(parameters[0]);
            proposals[proposalId].deadlineBlock = deadlineBlock;
        } else if (2 == op) { // zoomRange(uint256 _priceZoomFactor)
            proposals[proposalId].op == 2;
            proposals[proposalId].parameters.push(parameters[0]);
            proposals[proposalId].deadlineBlock = deadlineBlock;
        } else if (3 == op) { // IRobot
            proposals[proposalId].op == 3;
            proposals[proposalId].parameters.push(parameters[0]); // cycle
            proposals[proposalId].parameters.push(parameters[1]); // IRobot (address)
            proposals[proposalId].deadlineBlock = deadlineBlock;
        } else if (4 == op) { // IRobot remove
            proposals[proposalId].op == 4;
            proposals[proposalId].parameters.push(parameters[0]); // remove proposalId
            proposals[proposalId].deadlineBlock = deadlineBlock;
        }
    }

    function vote(uint porposalId, bool voteYes) external {
        require(proposals.length > porposalId, "FrankensteinDAO: NO_SUCH_PROPOSAL");
        require(proposals[porposalId].deadlineBlock >= block.number, "FrankensteinDAO: TOO_LATE");
        require(proposals[porposalId].voted[msg.sender] == 0, "FrankensteinDAO: TOO_LATE");
        proposals[porposalId].voted[msg.sender] = pool.balanceOf(msg.sender);
        if (voteYes) proposals[porposalId].yesVotes += pool.balanceOf(msg.sender); // Amount of liquidity; we are assuming that liquidity is not removed after voting (for the hackathon simplicity)
    }

    function execute(uint porposalId) external { // Anyone can execute a proposal if it is accepted. It should be externally scheduled or incentivized for anyone to call
        require(proposals.length > porposalId, "FrankensteinDAO: NO_SUCH_PROPOSAL");
        require(proposals[porposalId].deadlineBlock < block.number, "FrankensteinDAO: TOO_EARLY");
        require(proposals[porposalId].yesVotes >= pool.totalSupply() / 2); // At least half of liquidity should vote in favor
        if (0 == proposals[porposalId].op) { // setSwapFee(uint16 _fee)
            pool.setSwapFee(uint16(proposals[porposalId].parameters[0]));
            remove(porposalId);
        } else if (1 == proposals[porposalId].op) { // shiftRange(uint256 _priceShiftFactor)
            pool.shiftRange(proposals[porposalId].parameters[0]);
            remove(porposalId);
        } else if (2 == proposals[porposalId].op) { // zoomRange(uint256 _priceZoomFactor)
            pool.zoomRange(proposals[porposalId].parameters[0]);
            remove(porposalId);
        } else if (3 == proposals[porposalId].op) { // IRobot - repeated execution until removed
            IRobot robot = IRobot(address(uint160(proposals[porposalId].parameters[1])));
            if (0 == robot.cycle()) robot.setCycle(proposals[porposalId].parameters[0]); // Initialize
            if (block.number > robot.lastCallBlock() + robot.cycle()) robot.execute(pool); // Execute
        } else if (4 == proposals[porposalId].op) { // IRobot - remove
            remove(proposals[porposalId].parameters[0]);
        }
    }

    function remove(uint proposalId) private {
        if (proposals.length-1 != proposalId) { // Copy params from proposals[proposals.length-1] to proposals[proposalId]
            proposals[proposalId].op = proposals[proposals.length-1].op;
            proposals[proposalId].parameters[0] = proposals[proposals.length-1].parameters[0]; // Always has 1 param
            if (proposals[proposals.length-1].parameters.length > 1) { // Has 2 params
                if (proposals[proposalId].parameters.length < 2) proposals[proposalId].parameters.push(); // Add param if not there
                proposals[proposalId].parameters[1] = proposals[proposals.length-1].parameters[1];
            }
            // No operation has more than 2 params
        }
        proposals.pop();
    }
}