// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IFocusPool.sol";
import "./interfaces/IRobot.sol";

import "hardhat/console.sol";

contract MockRobot is IRobot {
    uint256 public constant DENOM = 10**18;
    uint public lastCallBlock;
    uint public cycle;

    // To turn off this robot, call: setCycle(type(uint).max)
    function setCycle(uint _cycle) public {
        require(_cycle > 0, "MockRobot: TOO_FREQUENT");
        cycle = _cycle;
    }
    
    function execute(IFocusPool pool) external {
        require(block.number > lastCallBlock + cycle, "MockRobot: TOO_SOON");
        lastCallBlock = block.number;
        pool.zoomRange(2 * DENOM);
    }
}