// SPDX-License-Identifier: MIT

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MockFocusPool", function () {
  it("Should return proper swap fee", async function () {
    const MockFocusPool = await ethers.getContractFactory("MockFocusPool");
    const mockFocusPool = await MockFocusPool.deploy();
    await mockFocusPool.deployed();

    expect(await mockFocusPool.swapFee()).to.equal(10000);
  });
});
