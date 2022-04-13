import { ethers } from "ethers";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import env from "react-dotenv";


import abi from "../utils/FrankensteinDAO.json";
import roboman from '../utils/roboman.png';

function CreateManual() {
  const [op, setOp] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [parameter, setParameter] = useState(null);

  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = abi.abi;
  const navigate = useNavigate();

  const setOption = (event) => {
    if (event.target.value === 'swapfree') {
      setOp(0);
    }
    else if (event.target.value === 'shiftrange') {
      setOp(1);
    }
    else if (event.target.value === 'zoomrange') {
      setOp(2);
    }
    else {
      alert("No option selected");
    }
  }

  const setParam = (event) => {
    setParameter(event.target.value);
  }

  const setDL = (event) => {
    setDeadline(event.target.value);
  }

  const propose = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.propose(op, deadline, [parameter]);
    const result = await tx.wait();

    console.log(tx);
    console.log(result);

    if (tx != null) {
      alert("Proposal submitted!");
      navigate("/vote");
    }
  }

  return (<div>
    <h4>Create manual intervention proposal</h4>

    <div style={{ width: "100%", display: "flex", alignItems:"center", marginTop:"2rem", marginBottom: "2rem"  }}>
      <div style={{ maxWidth: "50rem", margin: "auto" }}>
        <Container>
          <Row>
            <Col md={8}>
              <div onChange={(e) => setOption(e)}>
                <div className="standart-margin">
                  <span className="radio-container">
                    <input type="radio" value="swapfree" name="voting-option" /> Set Swap Free
                  </span>
                </div>
                <div className="standart-margin">
                  <span className="radio-container">
                    <input type="radio" value="shiftrange" name="voting-option" /> Shift Range
                  </span>
                </div>
                <div className="standart-margin">
                  <span className="radio-container">
                    <input type="radio" value="zoomrange" name="voting-option" /> Zoom Range
                  </span>
                </div>
              </div>
            </Col>
            <Col md={4}><img src={roboman} alt='Deploy Robot' style={{ width: "120px", marginTop:".5rem", marginLeft: "-2rem" }} /></Col>
          </Row>
        </Container>
      </div>
    </div>


    <div style={{ margin: ".8rem" }}><input type="text" placeholder="deadline" onChange={(e) => setDL(e)} /></div>
    <div style={{ margin: ".8rem" }}><input type="text" placeholder="parameter" onChange={(e) => setParam(e)} /></div>

    <div>
      <Button className="btn-custom-primary" onClick={propose}>Propose</Button>
    </div>

  </div>)
}


export default CreateManual;