import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import BigNumber from "bignumber.js";

import abi from "../utils/FrankensteinDAO.json";
import poolAbi from "../utils/IFocusPool.json";

import peace from '../utils/peace.png';
import executeimg from '../utils/executeimg.png';
import ProposalComponent from "./ProposalComponent";

function ExecuteComponent() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelected] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = abi.abi;
  const poolABI = poolAbi.abi;

  const selectProposal = async (proposal) => {
    setSelected(proposal);
  }

  const complies = async (proposal, supply) => {
    // listing  ELECTED proposal 
    // <div>for a robot: block.number gt robot.lastCallBlock() + robot.cycle()</div>

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const blockBig = await provider.getBlockNumber();
    const currentBlock = new BigNumber(blockBig);

    const result = proposal.yesVotes.isGreaterThan(supply.div(2))
      && currentBlock.isGreaterThan(proposal.deadlineBlock);
    console.log("comply: " + result);
    return result;
  }

  const getProposals = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const poolAddress = (await contract.pool());
      const poolContract = new ethers.Contract(poolAddress, poolABI, signer);
      const total = await poolContract.totalSupply();

      setTotalSupply(new BigNumber(total.toString()));

      const pCount = (await contract.numProposals()).toString();

      let parsedProposals = [];

      for (var i = 0; i < pCount; i++) {
        const proposalId = await contract.getProposalId(i);
        const proposal = await contract.getProposal(proposalId);
        const parsedProposal = {
          id: proposalId,
          op: proposal.op,
          p0: proposal.p0,
          p1: proposal.p1,
          yesVotes: new BigNumber(proposal.yesVotes.toString()),
          deadlineBlock: new BigNumber(proposal.deadlineBlock.toString()),
          iVoted: new BigNumber(proposal.iVoted.toString())
        }

        if (await complies(parsedProposal, new BigNumber(total.toString()))) {
          parsedProposals.push(parsedProposal);
        }
      }
      setProposals(parsedProposals);
    }
    catch (error) {
      console.log('errr: ' + error);
    }
  }

  const execute = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // @! accept
    const tx = await contract.execute(selectedProposal.id);
    const result = await tx.wait();

    console.log(tx);
    console.log(result);

    if (tx != null) {
      alert("Congratulations, you get 0.01 ETH!");
      window.location.reload(false);
    }
  }

  useEffect(() => {
    getProposals().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<div>
    <h3>Execute</h3>
    <img src={executeimg} alt='Deploy Robot' style={{ width: "100px", marginTop: "1rem", marginBottom: "0" }} />
    <div style={{ maxWidth: "100%", alignContent: "center" }}>
      <div className="proposals-list">
        <>
          {proposals.map((p, index) => {
            return (
              <div key={index} className={"proposal-item " + (selectedProposal === p && "proposal-item-selected")} style={{ textAlign: "center" }} onClick={() => selectProposal(p)}>
                <div>Proposal {p.id.toString()}</div>
                <div>
                  {p.p1.toString() !== '0'
                    ? <span className="item-robot">Robot</span>
                    : <span className="item-manual">Manual</span>}
                </div>
              </div>
            )
          })}
        </>
        <>
          {
            proposals.length === 0 &&
            <div className="no-proposals">
              <div style={{ padding: ".5rem" }}>No appropriate proposals</div>
              <div>
                <Link to={"/robot"} className="menuItem">Create Robot</Link >
                <Link to={"/manual"} className="menuItem">Create Manual</Link >
              </div>
            </div>
          }
        </>
      </div>
    </div>

    <div>
      {selectedProposal &&
        <>
          <ProposalComponent totalSupply={totalSupply} selected={selectedProposal} />
          <Button className="btn-custom-primary" onClick={execute}>Apply current strategy</Button>
        </>
      }
    </div>

    <br />
    <h5><img src={peace} alt='Vote' style={{ width: "80px" }} /> Get the Airdrop (0.01 ETH)</h5>
    <div style={{ display: "flex", margin: "auto" }}>
      <div className="airdrop-smalltext" style={{ maxWidth: "40rem", margin: "auto" }}>
        We are giving 0.01 ETH to anyone to execute an elected proposal. In Anchor protocol on Terra this is called "Airdrop" in a popup.
      </div>
    </div>

  </div>)
}

export default ExecuteComponent;