// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// This is a restricted interface for the purpose of building the DAO

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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
}
