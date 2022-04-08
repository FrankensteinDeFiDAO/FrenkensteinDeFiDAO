import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';
import { Button } from 'react-bootstrap'
import { ethers } from 'ethers'

function Account() {
    const [account, setCurrentAccount] = useState(null);
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
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
            setCurrentAccount(null);
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
                setCurrentAccount(accounts[0]);
            } else {
                setCurrentAccount(null);
            }
        } catch (error) {
            console.log(error);
            setCurrentAccount(null);
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

    if (account) return (<><div>Account: {account}</div><div>on {chain}</div> </>);
    else return (<><Button onClick={connectWallet}>Connect MetaMask</Button></>);
}

export default Account;