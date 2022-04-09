import { ethers } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

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
    {/* <div>
      ... selectable listing ... (clickable)
      <div>show function, parameter</div>
      <div>parameter</div>
      <div>deadline</div>
      <div>number of current votes/pool.totalSupply</div>
    </div> */}

    <div style={{maxWidth: "100%", alignContent: "center"}}>
      <div className="proposals-list" >
        {proposals.map((p, index) => {
          return (
            <div key={index} className="proposal-item">
                <div className="proposal-line">
                  Operation: <span className="proposal-value">{p.op.toString()}</span>
                </div>
                <div className="proposal-line">
                  p0: <span className="proposal-value">{p.p0.toString()}</span>
                </div>
                <div className="proposal-line">
                  {p.p1 != 0x0 ? <>Robot : <span className="proposal-address">{p.p1.toHexString()}</span></> : <>&nbsp;</>}
                </div>
                <div className="proposal-line">
                  Yes votes: <span className="proposal-value">{p.yesVotes.toString()}</span>
                </div>
                <div className="proposal-line">
                  Deadline block : <span className="proposal-value">{p.deadlineBlock.toString()}</span>
                </div>
                <div className="proposal-line">
                  I voted: <span className="proposal-value">{p.iVoted.toString()}</span>
                </div>
            </div>
          )
        })}
      </div>
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