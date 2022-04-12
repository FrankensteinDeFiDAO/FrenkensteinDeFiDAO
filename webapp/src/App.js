import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from 'ethers'
import Header from './components/Header';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ExecuteComponent from './components/Execute.js';
import VoteComponent from './components/Vote.js';
import CreateManual from './components/CreateManual.js';
import CreateRobot from './components/CreateRobot.js';
import RemoveComponent from './components/Remove.js';
import Home from './components/Home.js';

import monster from './utils/monster.png';

// require('dotenv').config();

function App() {
  const [account, setAccount] = useState(null);
  const [chain, setChain] = useState(null);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please, get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error)
      setAccount(null);
    }
  }

  const setWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please, get MetaMask");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    } catch (error) {
      console.log(error);
      setAccount(null);
    }
  }

  async function setChainName() {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const chainString = network.name + "(" + network.chainId + ")";
      setChain(chainString);
    }
    else {
      setChain(null);
    }
  }

  useEffect(() => {
    setWallet();
    setChainName();

    const { ethereum } = window;
    if (ethereum) {
      window.ethereum.on('accountsChanged', accounts => { setWallet(); });
      window.ethereum.on('chainChanged', async (chainId) => { setChainName(); });
      window.ethereum.on('connect', async (connectInfo) => { setChainName() });
      window.ethereum.on('disconnect', (error) => { console.log('disconnect wallet'); window.location.reload(); });
    }
  }, []);


  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <header className="App-header">
            <Header account={account} setAccount={setAccount} chain={chain} connectWallet={connectWallet} />
          </header>
          <br />
          {account ? <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/execute" element={<ExecuteComponent />} />
            <Route path="/vote" element={<VoteComponent />} />
            <Route path="/manual" element={<CreateManual />} />
            <Route path="/robot" element={<CreateRobot />} />
            <Route path="/remove" element={<RemoveComponent />} />
          </Routes>
            : <>
              <img src={monster} alt='Frankenstein DeFi DAO' style={{ width: "220px", marginBottom: "2rem" }} className="monster-img" />
              <div><Button onClick={connectWallet}>Connect MetaMask</Button></div>

              <div style={{ display: "block", marginTop: "2rem" }}>
                <h4 style={{ maxWidth: "40rem", margin: "auto" }}>Automated Market Maker DAO</h4>
                <h4 style={{ maxWidth: "40rem", margin: "auto" }}>human-bot collaboration to maximize capital efficiency.</h4>
              </div>
            </>}

        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
