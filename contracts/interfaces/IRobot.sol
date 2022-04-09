// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// This is a restricted interface for the purpose of building the DAO

import "./IFocusPool.sol";

interface IRobot {
    function cycle() external view returns(uint);
    function lastCallBlock() external view returns(uint);
    function setCycle(uint cycle) external;
    function execute(IFocusPool) external;
    function destroy() external;
}