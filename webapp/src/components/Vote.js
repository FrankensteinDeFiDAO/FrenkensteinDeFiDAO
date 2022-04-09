import { ethers } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

import abi from "../utils/FrankensteinDAO.json";

function VoteComponent() {
  const [proposalCount, setProposalCount] = useState(0);
  const [proposals, setProposals] = useState([]);

  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = abi.abi;

  const vote = async () => {

  }

  const cancel = async () => {

  }

  const getProposals = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const pCount = (await contract.numProposals()).toString();
      console.log('proposal count: ' + pCount);
      setProposalCount(pCount);

      let parsedProposals = [];

      for (var i = 0; i < pCount; i++) {
        const proposalId = await contract.getProposalId(i);
        const proposal = await contract.getProposal(proposalId);
        console.log(proposal);

        const parsedProposal = {
          op: proposal.op,
          p0: proposal.p0,
          p1: proposal.p1,
          yesVotes: proposal.yesVotes,
          deadlineBlock: proposal.deadlineBlock,
          iVoted: proposal.iVoted
        }

        parsedProposals.push(parsedProposal);
      }
      setProposals(parsedProposals);

    }
    catch (error) {
      console.log('errr: ' + error);
    }
  }

  useEffect(() => {
    getProposals();
  }, [])

  return (<div>

    <h4>Vote on proposal</h4>
    {/* <div>Proposals: {proposalCount}</div> */}
    {/* <div>
      ... selectable listing ... (clickable)
      <div>show function, parameter</div>
      <div>parameter</div>
      <div>deadline</div>
      <div>number of current votes/pool.totalSupply</div>
    </div> */}

    <div className="proposals-list">
      {proposals.map((p, index) => {
        return (
          <div key={index} className="proposal-item">
            <div>op: {p.op.toString()}</div>
            <div>p0: {p.p0.toString()}</div>
            <div>p1: {p.p1.toHexString()}</div>
            <div>Yes votes: {p.yesVotes.toString()}</div>
            <div>Deadline block : {p.deadlineBlock.toString()}</div>
            <div>i voted: {p.iVoted.toString()} </div>
          </div>)
      })}
    </div>

    <div>
      [list parameters]
    </div>
    <br />
    <div>
      <span className="radio-container">
        <input type="radio" value="yes" name="voting-option" /> Yes
      </span>
      <span className="radio-container">
        <input type="radio" value="no" name="voting-option" /> No
      </span>
    </div>

    <br />

    <div>
      <Button className="btn-primary" onClick={vote}>Vote</Button>
      <Button className="btn-secondary" onClick={cancel}>Cancel</Button>
    </div>

  </div>)
}


export default VoteComponent;