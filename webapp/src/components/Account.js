import React, { useEffect, useState } from "react";
import { ethers } from 'ethers'

function Account() {
    const [account, setCurrentAccount] = useState(null);
    const [chain, setChain] = useState(null);

    const setWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("Please, make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
          } else {
            console.log("No authorized account found");
          }
        } catch (error) {
          console.log(error);
        }
      }

    async function setChainName() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        const chainString = network.name + "(" + network.chainId + ")";
        setChain(chainString);
    }

    useEffect(() => {
        setWallet();
        setChainName();
        window.ethereum.on('accountsChanged', accounts => { setWallet(); });
        window.ethereum.on('chainChanged', async (chainId) => { setChainName(); });
        window.ethereum.on('connect', async (connectInfo) => { setChainName() });
        window.ethereum.on('disconnect', (error) => { window.location.reload(); });
      }, []);

    if (account) return (<><div>Account: {account}</div><div>on {chain}</div> </>);
    else return(<div>onboarding btn</div>);
}

export default Account;