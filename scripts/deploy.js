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

  // We get the contract to deploy
  const MockFocusPool = await hre.ethers.getContractFactory("MockFocusPool");
  const mockFocusPool = await MockFocusPool.deploy();
  await mockFocusPool.deployed();
  console.log("MockFocusPool deployed to:", mockFocusPool.address);

  const FrankensteinDAO = await hre.ethers.getContractFactory("FrankensteinDAO");
  const frankensteinDAO = await FrankensteinDAO.deploy(mockFocusPool.address);
  await frankensteinDAO.deployed();
  console.log("FrankensteinDAO deployed to:", frankensteinDAO.address);

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
