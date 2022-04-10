import { ethers } from "ethers";

// import { getContractAddress } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

import BigNumber from "bignumber.js";

import abi from "../utils/FrankensteinDAO.json";
import poolAbi from "../utils/IFocusPool.json";

function VoteComponent() {
  const [proposalCount, setProposalCount] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelected] = useState(null);
  const [voteChoice, setChoice] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = abi.abi;
  const poolABI = poolAbi.abi;

  const cancel = async () => {
    setSelected(null);
    setChoice(null);
  }

  const selectProposal = async (proposal) => {
    setSelected(proposal);
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
      console.log("pool: " + poolAddress);
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
      alert("voted?");
    }
  }

  useEffect(() => {
    getTotalSupply();
    getProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<div>
    <h4>Vote on proposal</h4>
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
              {/* op==4 => p0 == proposal id  */}


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
                {/* <span>{JSON.stringify(selectedProposal.p0)}</span> */}
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
                I voted:
                <span className="proposal-value">
                  {
                    selectedProposal.iVoted.toString() !== '0'
                      // <>&nbsp; {selectedProposal.iVoted.toString()} / {totalSupply} <span>{selectedProposal.iVoted.dividedBy(totalSupply)}</span></>
                      ? <span>&nbsp; {selectedProposal.iVoted.toString()} / {totalSupply.toString()} ({new BigNumber(selectedProposal.iVoted.div(totalSupply)).multipliedBy(100).toString()}%)</span>
                      : <>&nbsp; {selectedProposal.iVoted.toString()} / {totalSupply.toString()}</>
                  }
                </span>
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