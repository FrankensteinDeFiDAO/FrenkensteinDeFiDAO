import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from 'ethers'
import Header from './components/Header';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import AcceptComponent from './components/Accept.js';
import VoteComponent from './components/Vote.js';
import Home from './components/Home.js';

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
      <BrowserRouter>
        <header className="App-header">
        <Header account={account} setAccount={setAccount} chain={chain} connectWallet={connectWallet} />
        </header>

        {account ? <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accept" element={<AcceptComponent />} />
          <Route path="/vote" element={<VoteComponent />} />
        </Routes>
        : <><Button onClick={connectWallet}>Connect MetaMask</Button></> }
        
      </BrowserRouter>
    </div>
  );
}

export default App;
