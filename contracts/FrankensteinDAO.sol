// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IFocusPool.sol";
import "./interfaces/IRobot.sol";

import "hardhat/console.sol";

contract FrankensteinDAO {
    IFocusPool public pool;

    uint[] public proposalIdList; // To be able to list them
    mapping (uint => opType) proposalsById;
    uint nextProposalId; // = 0 automatically

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

    function numProposals() external view returns(uint) {
        return proposalIdList.length;
    }

    // Used to list all proposals by looping from 0 to numProposals()-1
    function getProposalId(uint ord) external view returns (uint) {
        return proposalIdList[ord];
    }

    // returned p1 is 0 of p1 does not exist
    // voted returns the amount of liquidity the voter has voted with; 0 means that the msg.sender has not voted yet
    function getProposal(uint proposalId) external view returns(uint8 op, uint p0, uint p1, uint yesVotes, uint deadlineBlock, uint iVoted) {
        op = proposalsById[proposalId].op;
        p0 = proposalsById[proposalId].parameters[0];
        p1 = proposalsById[proposalId].parameters.length>1 ? proposalsById[proposalId].parameters[1] : 0;
        yesVotes = proposalsById[proposalId].yesVotes;
        deadlineBlock = proposalsById[proposalId].deadlineBlock;
        iVoted = proposalsById[proposalId].voted[msg.sender];
    }

    function propose(uint8 op, uint deadlineBlock, uint[] memory parameters) external returns (uint proposalId) {
        require(pool.balanceOf(msg.sender) > 0, "FrankensteinDAO: NOT_A_MEMBER"); // Must have liquidity in pool
        proposalId = nextProposalId++;
        proposalIdList.push(proposalId);
        if (0 == op) { // setSwapFee(uint16 _fee)
            proposalsById[proposalId].op = 0;
            proposalsById[proposalId].parameters.push(parameters[0]);
            proposalsById[proposalId].deadlineBlock = deadlineBlock;
        } else if (1 == op) { // shiftRange(uint256 _priceShiftFactor)
            proposalsById[proposalId].op = 1;
            proposalsById[proposalId].parameters.push(parameters[0]);
            proposalsById[proposalId].deadlineBlock = deadlineBlock;
        } else if (2 == op) { // zoomRange(uint256 _priceZoomFactor)
            proposalsById[proposalId].op = 2;
            proposalsById[proposalId].parameters.push(parameters[0]);
            proposalsById[proposalId].deadlineBlock = deadlineBlock;
        } else if (3 == op) { // IRobot
            proposalsById[proposalId].op = 3;
            proposalsById[proposalId].parameters.push(parameters[0]); // cycle
            proposalsById[proposalId].parameters.push(parameters[1]); // IRobot (address)
            proposalsById[proposalId].deadlineBlock = deadlineBlock;
        } else if (4 == op) { // IRobot remove
            proposalsById[proposalId].op = 4;
            proposalsById[proposalId].parameters.push(parameters[0]); // remove proposalId
            proposalsById[proposalId].deadlineBlock = deadlineBlock;
        }
    }

    function vote(uint porposalId, bool voteYes) external {
        require(0 != proposalsById[porposalId].deadlineBlock, "FrankensteinDAO: NO_SUCH_PROPOSAL");
        require(pool.balanceOf(msg.sender) > 0, "FrankensteinDAO: NOT_A_MEMBER"); // Must have liquidity in pool
        require(proposalsById[porposalId].deadlineBlock >= block.number, "FrankensteinDAO: TOO_LATE");
        require(proposalsById[porposalId].voted[msg.sender] == 0, "FrankensteinDAO: ALREADY_VOTED");
        proposalsById[porposalId].voted[msg.sender] = pool.balanceOf(msg.sender);
        if (voteYes) proposalsById[porposalId].yesVotes += pool.balanceOf(msg.sender); // Amount of liquidity; we are assuming that liquidity is not removed after voting (for the hackathon simplicity)
    }

    function execute(uint porposalId) external { // Anyone can execute a proposal if it is accepted. It should be externally scheduled or incentivized for anyone to call
        require(0 != proposalsById[porposalId].deadlineBlock, "FrankensteinDAO: NO_SUCH_PROPOSAL");
        require(proposalsById[porposalId].deadlineBlock < block.number, "FrankensteinDAO: TOO_EARLY");
        require(proposalsById[porposalId].yesVotes >= pool.totalSupply() / 2, "FrankensteinDAO: NOT_ELECTED"); // At least half of liquidity should vote in favor
        if (0 == proposalsById[porposalId].op) { // setSwapFee(uint16 _fee)
            pool.setSwapFee(uint16(proposalsById[porposalId].parameters[0]));
            remove(porposalId);
        } else if (1 == proposalsById[porposalId].op) { // shiftRange(uint256 _priceShiftFactor)
            pool.shiftRange(proposalsById[porposalId].parameters[0]);
            remove(porposalId);
        } else if (2 == proposalsById[porposalId].op) { // zoomRange(uint256 _priceZoomFactor)
            pool.zoomRange(proposalsById[porposalId].parameters[0]);
            remove(porposalId);
        } else if (3 == proposalsById[porposalId].op) { // IRobot - repeated execution until removed
            IRobot robot = IRobot(address(uint160(proposalsById[porposalId].parameters[1])));
            if (0 == robot.cycle()) robot.setCycle(proposalsById[porposalId].parameters[0]); // Initialize
            if (block.number > robot.lastCallBlock() + robot.cycle()) robot.execute(pool); // Execute
        } else if (4 == proposalsById[porposalId].op) { // IRobot - remove
            IRobot robot = IRobot(address(uint160(proposalsById[porposalId].parameters[1])));
            robot.destroy();
            remove(porposalId);
        }
    }

    function remove(uint proposalId) private {
        require(0 != proposalsById[proposalId].deadlineBlock, "FrankensteinDAO: NO_SUCH_PROPOSAL");
        delete(proposalsById[proposalId].parameters);
        // delete(proposalsById[proposalId].voted);
        delete(proposalsById[proposalId]);
        for (uint i=0; i<proposalIdList.length; i++) if (proposalIdList[i] == proposalId) { // remove from list
            if (i == proposalIdList.length-1) proposalIdList[i] = proposalIdList[proposalIdList.length-1]; // swap with last
            proposalIdList.pop();
            break;
        }
    }
}