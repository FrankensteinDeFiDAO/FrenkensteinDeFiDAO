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
  let mockRobot;

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

    const MockRobot = await ethers.getContractFactory("MockRobot");
    mockRobot = await MockRobot.deploy();
    await mockRobot.deployed();
  });

  it("Should return proper swap fee", async function () {
    expect(await mockFocusPool.swapFee()).to.equal(10000);
  });

  it("Should propose", async function () {
    const txconf = await (await frankensteinDAO.connect(voter).propose(0, (await ethers.provider.getBlockNumber()) + 10, [1])).wait();

    expect(txconf.confirmations > 0);
  });

  it("Should vote", async function () {
    const txconf = await (await frankensteinDAO.connect(voter).propose(0, (await ethers.provider.getBlockNumber()) + 10, [1])).wait();
    expect(txconf.confirmations > 0);
    await expect(frankensteinDAO.connect(voter).vote(0, true))
    await expect(frankensteinDAO.connect(nonVoter).vote(0, true)).to.be.reverted;
  });

  it("Should propose 3", async () => {
    await (await frankensteinDAO.connect(voter).propose(0, 10000, [5])).wait();
    await (await frankensteinDAO.connect(voter).propose(1, 9000, [6])).wait();
    await (await frankensteinDAO.connect(voter).propose(3, 9000, [7, mockRobot.address])).wait();

    await expect(await frankensteinDAO.connect(voter).numProposals()).to.be.equal(3);
    await expect((await frankensteinDAO.getProposal(await frankensteinDAO.connect(voter).getProposalId(0))).op).to.be.equal(0);
    await expect((await frankensteinDAO.getProposal(await frankensteinDAO.connect(voter).getProposalId(1))).op).to.be.equal(1);
    await expect((await frankensteinDAO.getProposal(await frankensteinDAO.connect(voter).getProposalId(2))).op).to.be.equal(3);
  });
});
