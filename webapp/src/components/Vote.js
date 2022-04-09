import { ethers } from "ethers";
// import { getContractAddress } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

import abi from "../utils/FrankensteinDAO.json";

function VoteComponent() {
  const [proposalCount, setProposalCount] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelected] = useState(null);
  const [voteChoice, setChoice] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = abi.abi;

  const cancel = async () => {
    setSelected(null);
    setChoice(null);
  }

  const selectProposal = async (proposal) => {
    setSelected(proposal);
  }

  const setVote = (event) => {
    if(event.target.value === 'true') {
      setChoice(true);
    }
    else {
      setChoice(false);
    }
  }

  const checkCanVote = () => {
    return (selectedProposal != null && voteChoice != null);
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
      console.log(proposalCount + " proposals");

      let parsedProposals = [];

      for (var i = 0; i < pCount; i++) {
        const proposalId = await contract.getProposalId(i);
        const proposal = await contract.getProposal(proposalId);
        const parsedProposal = {
          id: proposalId,
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

  const getTotalSupply = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const supply = (await contract.pool.totalSupply());
      console.log('total supply: ' + supply);
      setTotalSupply(supply);
      console.log(totalSupply + " total supply");
    }
    catch (error) {
      console.log('errr: ' + error);
    }
  }

  const vote = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.vote(selectedProposal.id, voteChoice);
    const result = await tx.wait();

    console.log(tx);
    console.log(result);

    setSelected(null);
    setChoice(null);

    if(tx != null) {
      alert("voted?");
    }
  }

  useEffect(() => {
    getProposals();
    getTotalSupply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    <div style={{ maxWidth: "100%", alignContent: "center" }}>
      <div className="proposals-list" >
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
      </div>
    </div>

    <div>
      {selectedProposal &&
        <div>
          <div className="proposal-show-container">
            <div className="proposal-show">
              <div className="proposal-line">
                Operation:&nbsp; 
                <span className="proposal-value">
                  {
                    selectedProposal.op.toString() === '0' 
                    ? 'Set Swap Free (' + selectedProposal.op.toString() + ')'
                    : selectedProposal.op.toString() === '1' 
                      ? 'Shift Range (' + selectedProposal.op.toString() + ')'
                      : selectedProposal.op.toString() === '2' 
                        ? 'Zoom Range (' + selectedProposal.op.toString() + ')'
                        : 'Robot Strategy (' + selectedProposal.op.toString() + ')'
                  }
                </span>
              </div>

              {/* If op==0, 1, 2, 4, you should display 1 param (p0) only in decimal 
              If op==3 display p0 in decimal and p1 in hex as 0x… */}

              {/*  @! */}
              {/* op ==1 => fee, op==1 priceShiftFactor, op==2 priceZoomFactor */}

              <div className="proposal-line">
                <span>
                  {
                    selectedProposal.op.toString() === '0' 
                      ? 'Swap Fee'
                      : selectedProposal.op.toString() === '1' 
                        ? 'Shift Factor'
                        : selectedProposal.op.toString() === '2' 
                          ? 'Zoom Factor'
                          : 'Parameter'
                  }

                </span>
                <span>:&nbsp;</span>
                <span className="proposal-value">{selectedProposal.p0.toString()}</span>
              </div>
              <div className="proposal-line">
                {selectedProposal.p1.toString() !== '0' ? <>Robot address: <span className="proposal-address">{selectedProposal.p1.toHexString()}</span></> : <>&nbsp;</>}
              </div>
              <div className="proposal-line">
                Yes votes: <span className="proposal-value">{selectedProposal.yesVotes.toString()}</span>
              </div>
              <div className="proposal-line">
                Deadline block : <span className="proposal-value">{selectedProposal.deadlineBlock.toString()}</span>
              </div>
              <div className="proposal-line">
                I voted: <span className="proposal-value">{selectedProposal.iVoted.toString()}</span>
              </div>
            </div>
          </div>

          <br />
          <h5>Your vote</h5>
          <div onChange={(e) => setVote(e)}>
            <span className="radio-container">
              <input type="radio" value="true" name="voting-option" /> Yes
            </span>
            <span className="radio-container">
              <input type="radio" value="false" name="voting-option" /> No
            </span>
          </div>
        </div>
      }
    </div>

    <br />

    <div>
      <Button className="btn-primary" onClick={vote} disabled={!checkCanVote()}>Vote</Button>
      <Button className="btn-secondary" onClick={cancel} disabled={!checkCanVote()}>Cancel</Button>
    </div>

  </div>)
}


export default VoteComponent;