// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IFocusPool.sol";
import "./interfaces/IRobot.sol";
import "./interfaces/IFrankensteinDAO.sol";

import "hardhat/console.sol";

contract MockRobot is IRobot {
    uint256 public constant DENOM = 10**18;
    uint public lastCallBlock;
    uint public cycle;
    IFrankensteinDAO frankensteinDAO;

    function init() external {
        frankensteinDAO = IFrankensteinDAO(msg.sender);
    }

    // To turn off this robot, call: setCycle(type(uint).max)
    function setCycle(uint _cycle) public {
        require(IFrankensteinDAO(msg.sender) == frankensteinDAO, "MockRobot: FORBIDDEN");
        require(_cycle > 0, "MockRobot: TOO_FREQUENT");
        cycle = _cycle;
    }
    
    function execute() external {
        require(IFrankensteinDAO(msg.sender) == frankensteinDAO, "MockRobot: FORBIDDEN");
        require(block.number > lastCallBlock + cycle, "MockRobot: TOO_SOON");
        lastCallBlock = block.number;
        frankensteinDAO.zoomPoolRange(2 * DENOM);
    }

    function destroy() external {
        require(IFrankensteinDAO(msg.sender) == frankensteinDAO, "MockRobot: FORBIDDEN");
        selfdestruct(payable(address(0))); // burn
    }
}