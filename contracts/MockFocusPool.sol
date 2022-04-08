// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";
import "./interfaces/IFocusPool.sol";

import "hardhat/console.sol";

contract MockFocusPool is IFocusPool, ERC20PresetFixedSupply("Focus Liquidity", "FLP", 1000000000000000000000000, msg.sender) {
    uint16 public swapFee;
    uint16 public constant SWAP_FEE_DENOM = 10000;
    uint256 public constant DENOM = 10**18;
    uint256 public constant SQRT_DENOM =  10**9;
    uint256 public constant RANGE_FATOR_MIN = 10*5;

    uint public constant MINIMUM_LIQUIDITY = 10**3;

    IERC20 public token0;
    IERC20 public token1;

    uint112 private actualReserve0; // uses single storage slot, accessible via getReserves
    uint112 private actualReserve1; // uses single storage slot, accessible via getReserves

    uint112 private virtualReserve0;           // uses single storage slot, accessible via getReserves
    uint112 private virtualReserve1;           // uses single storage slot, accessible via getReserves
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves

    uint public price0CumulativeLast;
    uint public price1CumulativeLast;

    address public governance;
    
    constructor() {
        virtualReserve0 = uint112(DENOM);
        virtualReserve1 = uint112(DENOM);
        actualReserve0 = uint112(DENOM);
        actualReserve1 = uint112(DENOM);
        swapFee = SWAP_FEE_DENOM;
        governance = msg.sender;
    }

    function getReserves() public view returns (uint112 _actualReserve0, uint112 _actualReserve1, uint112 _virtualReserve0, uint112 _virtualReserve1, uint32 _blockTimestampLast) {
        _virtualReserve0 = virtualReserve0;
        _virtualReserve1 = virtualReserve1;
        _actualReserve0 = actualReserve0;
        _actualReserve1 = actualReserve1;
        _blockTimestampLast = blockTimestampLast;
    }

    function shiftRange(uint256 _priceShiftFactor) external {
        require(msg.sender == governance, "Focus: FORBIDDEN");
        uint256 vr1 = uint256(virtualReserve1) * _priceShiftFactor / DENOM; // Actual implementation checks overflows
        require(vr1 <= type(uint112).max, "Focus: OVERFLOW");
        virtualReserve1 = uint112(vr1);
    }

    function zoomRange(uint256 _priceZoomFactor) external {
        require(msg.sender == governance, "Focus: FORBIDDEN");
        uint256 vr0 = uint256(virtualReserve0) * _priceZoomFactor / DENOM; // Actual implementation checks overflows
        uint256 vr1 = uint256(virtualReserve1) * _priceZoomFactor / DENOM; // Actual implementation checks overflows
        require(vr0 <= type(uint112).max && vr1 <= type(uint112).max, "Focus: OVERFLOW");
        virtualReserve0 = uint112(vr0);
        virtualReserve1 = uint112(vr1);

    }

    function setSwapFee(uint16 _fee) external {
        require(msg.sender == governance, "Focus: FORBIDDEN");
        swapFee = _fee;
    }
}
