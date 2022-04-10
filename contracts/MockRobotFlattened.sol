// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
   event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface IFocusPool is IERC20 {
    function MINIMUM_LIQUIDITY() external pure returns (uint);
    function token0() external view returns (IERC20);
    function token1() external view returns (IERC20);
    function getReserves() external view returns (uint112 _actualReserve0, uint112 _actualReserve1, uint112 virtualReserve0, uint112 virtualReserve1, uint32 blockTimestampLast);
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);

    function setSwapFee(uint16 _fee) external;
    function swapFee() external view returns (uint16);
    function SWAP_FEE_DENOM() external pure returns (uint16);

    function shiftRange(uint256 _priceShiftFactor) external;
    function zoomRange(uint256 _priceZoomFactor) external;

    function setGovernance(address) external;
}

interface IRobot {
    function cycle() external view returns(uint);
    function lastCallBlock() external view returns(uint);
    function setCycle(uint cycle) external;
    function execute(IFocusPool) external;
    function destroy() external;
}

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

    function destroy() external {
        selfdestruct(payable(address(0))); // burn
    }
}