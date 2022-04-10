// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IFrankensteinDAO {
    function setPoolSwapFee(uint16 _fee) external;
    function shiftPoolRange(uint256 _priceShiftFactor) external;
    function zoomPoolRange(uint256 _priceZoomFactor) external ;
}
