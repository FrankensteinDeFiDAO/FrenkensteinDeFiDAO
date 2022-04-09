// SPDX-License-Identifier: MIT

const { ethers, waffle } = require('hardhat')
const { expect } = require('chai')
const { Contract, Wallet } = require('ethers')
const { solidity, MockProvider, deployContract } = require('ethereum-waffle')
const { ecsign } = require('ethereumjs-util')

const { SignerWithAddress } = require('@nomiclabs/hardhat-ethers/signers')

describe("FrankensteinDAO", () => {
  let wallet;
  let voter;
  let nonVoter;
  let mockFocusPool;
  let frankensteinDAO;

  beforeEach(async () => {
    [wallet, voter, nonVoter]= await waffle.provider.getWallets()

    const MockFocusPool = await ethers.getContractFactory("MockFocusPool");
    mockFocusPool = await MockFocusPool.deploy();
    await mockFocusPool.deployed();
    await mockFocusPool.mockLiquidity(voter.address);

    const FrankensteinDAO = await ethers.getContractFactory("FrankensteinDAO");
    frankensteinDAO = await FrankensteinDAO.deploy(mockFocusPool.address);
    await frankensteinDAO.deployed();
    await mockFocusPool.setGovernance(frankensteinDAO.address);
  });

  it("Should return proper swap fee", async function () {
    expect(await mockFocusPool.swapFee()).to.equal(10000);
  });

  it("Should propose", async function () {
    const proposalId = await frankensteinDAO.connect(voter).propose(0, (await ethers.provider.getBlockNumber()) + 10, [1]);

    expect(proposalId === 0);
  });

  it("Should vote", async function () {
    const proposalId = await frankensteinDAO.connect(voter).propose(0, (await ethers.provider.getBlockNumber()) + 10, [1]);
    await expect(frankensteinDAO.connect(voter).vote(0, true))
    await expect(frankensteinDAO.connect(nonVoter).vote(0, true)).to.be.reverted;
  });
});
