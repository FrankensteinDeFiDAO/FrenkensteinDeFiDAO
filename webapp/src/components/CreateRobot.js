import { Button } from 'react-bootstrap';
import React, { useState } from "react";
// import { loadVersion, getVersions } from 'browser-solc';
import * as IPFS from 'ipfs-core'

function CreateRobot() {
  const [source, setSource] = useState(null);

  const compile = async () => {
    const ipfs = await IPFS.create();
    console.log('created');
    const { cid } = await ipfs.add(source);
    console.log('did run');
    console.log(cid);
  }

  const deploy = async () => {

  }

  const propose = async () => {

  }

  const setDL = (e) => {
    setSource(e.target.value);
  }

  return (<div>
    <h4>Propose a robot strategy</h4>
    <br />

    <textarea placeholder='Paste robot source' onChange={(e) => setDL(e)} />

    <br />
    <div>
      <Button className="btn-custom-primary" onClick={compile}>Compile</Button>
      <Button className="btn-custom-primary" onClick={deploy}>Deploy</Button>
      <Button className="btn-custom-primary" onClick={propose}>Propose</Button>
    </div>
  </div>)
}


export default CreateRobot;