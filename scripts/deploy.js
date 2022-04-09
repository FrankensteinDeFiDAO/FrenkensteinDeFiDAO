// SPDX-License-Identifier: MIT

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [owner, voter1, voter2, voter3, voter4] = await ethers.getSigners();

  // We get the contract to deploy
  const MockFocusPool = await hre.ethers.getContractFactory("MockFocusPool");
  const mockFocusPool = await MockFocusPool.deploy();
  await mockFocusPool.deployed();
  console.log("MockFocusPool deployed to:", mockFocusPool.address);
  await mockFocusPool.mockLiquidity(voter1.address);
  await mockFocusPool.mockLiquidity(voter2.address);
  await mockFocusPool.mockLiquidity(voter3.address);
  await mockFocusPool.mockLiquidity(voter4.address);

  const FrankensteinDAO = await hre.ethers.getContractFactory("FrankensteinDAO");
  const frankensteinDAO = await FrankensteinDAO.deploy(mockFocusPool.address);
  await frankensteinDAO.deployed();
  console.log("FrankensteinDAO deployed to:", frankensteinDAO.address);
  await mockFocusPool.setGovernance(frankensteinDAO.address);

  const MockRobot = await hre.ethers.getContractFactory("MockRobot");
  const mockRobot = await MockRobot.deploy();
  await mockRobot.deployed();
  console.log("MockRobot deployed to:", mockRobot.address);

 }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
