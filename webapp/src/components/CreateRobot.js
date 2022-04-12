import { ethers } from "ethers";
import { Button } from 'react-bootstrap';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as IPFS from 'ipfs-core'
import robotAbi from "../utils/MockRobot.json";
import abi from "../utils/FrankensteinDAO.json";
import pc from '../utils/pc.png';

function CreateRobot() {
  const [source, setSource] = useState(null);
  const [CID, setCid] = useState(null);
  const [addr, setAddr] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [cycle, setCycle] = useState(null);

  const contractAddress = window.env.CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const robotABI = robotAbi.abi;
  const bytecode = robotAbi.bytecode;
  const navigate = useNavigate();
  


  const compile = async () => {
    if(source == null || source === '') {
      alert('Please, input robot source.');
      return;
    }

    const ipfs = await IPFS.create();
    console.log('created');
    const { cid } = await ipfs.add(source);
    console.log('did run' + cid);
    setCid(cid.toString());
  }

  const deploy = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const factory = new ethers.ContractFactory(robotABI, bytecode, signer);
    const contract = await factory.deploy();
    console.log('contract: ' + contract.address);
    const mined = await contract.deployed();
    console.log('mined: ', mined.deployTransaction.hash);
    setAddr(contract.address);
  }

  const propose = async () => {
    console.log('deployed cid: ' + CID);
    console.log('robot address: ' + addr);

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // @! accept
    const tx = await contract.propose(3, deadline, [cycle, addr]);
    const result = await tx.wait();

    console.log(tx);
    console.log(result);

     if (tx != null) {
       alert("Proposal submitted!");
       navigate("/vote");
     }
  }

  const setSRC = (e) => {
    setSource(e.target.value);
  }

  const setDL = (e) => {
    setDeadline(e.target.value);
  }

  const setCCL = (e) => {
    setCycle(e.target.value);
  }

  const getIpfsUrl = () => {
    return 'http://ipfs.io/ipfs/' + CID;
  }

  const noCid = () => {
    return CID == null;
  }

  const noAddress = () => {
    return addr == null;
  }

  return (<div>
    <h4>Propose a robot strategy <img src={pc} alt='Deploy Robot' style={{ width: "140px" }} /></h4>

    <textarea placeholder='Paste robot source' onChange={(e) => setSRC(e)} />

    <br />
    <div>
      <Button className="btn-custom-primary" onClick={compile}>Upload to IPFS</Button>
    </div>

    <div>{CID && <a href={getIpfsUrl()} target="_blank" rel="noreferrer" className="ipfs-link">{getIpfsUrl()}</a>}</div>

    <div>
      <Button className="btn-custom-primary" onClick={deploy} disabled={noCid()}>Deploy</Button>
    </div>

    <div>{addr}</div>

    <div>
      <div style={{ margin: ".8rem" }}><input type="text" placeholder="deadline" onChange={(e) => setDL(e)} /></div>
      <div style={{ margin: ".8rem" }}><input type="text" placeholder="cycle" onChange={(e) => setCCL(e)} /></div>
    </div>
    <div>
      <Button className="btn-custom-primary" onClick={propose} disabled={noAddress()}>Propose</Button>
    </div>

    <div>{}</div>
  </div>)
}


export default CreateRobot;