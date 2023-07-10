[This project's entry](https://showcase.ethglobal.com/daohacks/frankensteindefidao-sojy5) at the [DAOHacks 2022](https://dao.ethglobal.com/) hackathon won the 🏊‍♂️ [IPFS — Pool Prize](https://showcase.ethglobal.com/daohacks/frankensteindefidao-sojy5). 

# Frankenstein DeFi DAO - where people and robot members join forces to manage DeFi liquidity

## Background

We are presenting a hybrid Decentralized Autonomous Organization (DAO) in which both robots (programs) and people can participate in order to improve the capital efficiency and thus profitability of the liquidity deployed in the Focus Protocol Automated Market Maker (AMM). Each liquidity provider can vote directly with voting power proportional to the value of the liquidity deployed. In addition, voters can proxy-vote, delegating their voting power to other trusted or trustless parties. If proxied to people the issuer of the proxy entrusts the voting power to the receiver. If proxied to robots, the relationship is trustless (no need for trust) as the robots act in a predescribed manner as exhibited by their source code.

Focus Protocol is an AMM similar to Uniswap V3, with concentrated liquidity capability, but in addition it is able to dynamically shift and stretch/squeeze the price range of the concentrated liquidity in order to improve capital efficiency and maximize the profit for the liquidity proveiders, while improving the available liquidity for the swappers.

## Implementation

Humans can vote on the following Focus Pool updates:

    function shiftRange(uint256 _priceShiftFactor) external;

    function zoomRange(uint256 _priceZoomFactor) external;

    function setSwapFee(uint16 _fee) external;

However robots can execute functions with signature:

    function execute(IFocusPool) external;

How often the above function can be executed is determined by the cycle, which is number of blocks before the next "execute" can be called by anyone. To set this value, the voters can call the following robot's function:

    function setCycle(uint cycle) external;

Note that the human updates contain constant parameters, while the robot uses the given pool to extract values from it, re-calculate parameter updates and then call one or more of the three update functions.

Anyone can call the robot, and it should be a scheduled operation. However, the cycle parameter determines how many blocks should pass before the robot can execute the function again, otherwise it would revert.
## Installation

1. Install hardhat using "npm install -g hardhat"
2. Clone this repository in some folder
3. In this folder install the depenencies using "npm install"

To test the smart contracts run "npx hardhat test"

To deploy and run smart contracts
1. Run "npx hardhat node" in console and leave it running
2. Run "npx hardhat run scrtipts/deploy.js" to deploy the smart contracts
3. Run the web service using "TBD!!!"
## Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

npx hardhat run .\scripts\deploy.js --network localhost
