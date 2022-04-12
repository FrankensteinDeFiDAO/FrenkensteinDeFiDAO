import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import BigNumber from "bignumber.js";


import abi from "../utils/FrankensteinDAO.json";
import poolAbi from "../utils/IFocusPool.json";

import consensus from '../utils/consensus.png';



function VoteComponent() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelected] = useState(null);
  const [voteChoice, setChoice] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [deadlineNotPassed, setDeadlineNotPassed] = useState(true);

  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = abi.abi;
  const poolABI = poolAbi.abi;

  const cancel = async () => {
    setSelected(null);
    setChoice(null);
  }

  const selectProposal = async (proposal) => {
    setSelected(proposal);

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const blockBig = await provider.getBlockNumber();
    const currentBlock = new BigNumber(blockBig);

    console.log(currentBlock.toString() + " " + proposal.deadlineBlock);

    const notPassed = proposal.deadlineBlock.isGreaterThan(currentBlock);
    setDeadlineNotPassed(notPassed);
  }

  const setVote = (event) => {
    if (event.target.value === 'true') {
      setChoice(true);
    }
    else {
      setChoice(false);
    }
  }

  const checkCanVote = () => {
    return (selectedProposal != null && voteChoice != null);
  }

  const proposalAlreadyVoted = () => {
    return (selectedProposal.iVoted.isGreaterThan(0));
  }

  const getProposals = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const pCount = (await contract.numProposals()).toString();
      console.log('count: ' + pCount);

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

      const poolAddress = (await contract.pool());
      const poolContract = new ethers.Contract(poolAddress, poolABI, signer);
      const total = await poolContract.totalSupply();

      setTotalSupply(new BigNumber(total.toString()));
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

    if (tx != null) {
      alert("Voted!");
      window.location.reload(false);
    }
  }

  useEffect(() => {
    getTotalSupply();
    getProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<div>
    <h3>Vote on proposal </h3>
    <img src={consensus} alt='Deploy Robot' style={{ width: "160px", margin: "1rem" }} />

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
                          : selectedProposal.op.toString() === '3'
                            ? 'Robot Strategy (' + selectedProposal.op.toString() + ')'
                            : selectedProposal.op.toString() === '4'
                              ? 'Remove Robot (' + selectedProposal.op.toString() + ')'
                              : 'Unknown Operation'
                  }
                </span>
              </div>


              {/*  swap fee: n / 100  -- %   > 30 == 0.3% */}
              {/* others 18 decimals */}

              <div className="proposal-line">
                <span>
                  {
                    selectedProposal.op.toString() === '0'
                      ? 'Swap Fee'
                      : selectedProposal.op.toString() === '1'
                        ? 'Shift Factor'
                        : selectedProposal.op.toString() === '2'
                          ? 'Zoom Factor'
                          : selectedProposal.op.toString() === '3'
                            ? 'Cycle'
                            : selectedProposal.op.toString() === '4'
                              ? 'Proposal ID'
                              : 'Unknown'
                  }

                </span>
                <span>:&nbsp;</span>
                <span className="proposal-value">{selectedProposal.p0.toString()}</span>
              </div>
              <div className="proposal-line">
                {selectedProposal.p1.toString() !== '0' ? <>Robot address: <span className="proposal-address">{selectedProposal.p1.toHexString()}</span></> : <>&nbsp;</>}
              </div>
              <div className="proposal-line">
                Yes votes:
                <span className="proposal-value">
                  {
                    selectedProposal.yesVotes.isGreaterThan(0)
                      ? <span>&nbsp; {selectedProposal.yesVotes.toString()} / {totalSupply.toString()} ({new BigNumber(selectedProposal.yesVotes.div(totalSupply)).multipliedBy(100).toString()}%)</span>
                      : <span>&nbsp; {selectedProposal.yesVotes.toString()} / {totalSupply.toString()} </span>
                  }
                </span>
              </div>
              <div className="proposal-line">
                Deadline block : <span className="proposal-value">{selectedProposal.deadlineBlock.toString()}</span>
              </div>
              <div className="proposal-line">
                I voted:
                <span className="proposal-value">
                  {
                    selectedProposal.iVoted.toString() !== '0'
                      ? <span>&nbsp; {selectedProposal.iVoted.toString()} / {totalSupply.toString()} ({new BigNumber(selectedProposal.iVoted.div(totalSupply)).multipliedBy(100).toString()}%)</span>
                      : <span>&nbsp; {selectedProposal.iVoted.toString()} / {totalSupply.toString()} </span>
                  }
                </span>
              </div>
            </div>
          </div>

          <br />

          <div>
            {deadlineNotPassed
              ? <>
                {proposalAlreadyVoted()
                  ? <span className="already-voted-message">Already voted!</span>
                  : <>
                    <h5>Your vote</h5>
                    <div onChange={(e) => setVote(e)}>
                      <span className="radio-container">
                        <input type="radio" value="true" name="voting-option" /> Yes
                      </span>
                      <span className="radio-container">
                        <input type="radio" value="false" name="voting-option" /> No
                      </span>
                    </div>
                  </>
                }
              </>
              : <span className="deadline-passed-message">Deadline already passed!</span>}
          </div>



        </div>
      }
    </div>

    <br />

    <div>
      <Button className="btn-primary" onClick={vote} disabled={!checkCanVote() || !deadlineNotPassed || !proposalAlreadyVoted()}>Vote</Button>
      <Button className="btn-secondary" onClick={cancel} disabled={!checkCanVote()}>Cancel</Button>
    </div>

  </div>)
}


export default VoteComponent;