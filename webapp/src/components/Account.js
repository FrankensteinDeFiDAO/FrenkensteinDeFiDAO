import React from 'react'
import { ethers } from 'ethers'

function Account() {
    const [account, setCurrentAccount] = React.useState(null);
    const [chain, setChain] = React.useState(null);

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
            console.log("No authorized account found")
          }
        } catch (error) {
          console.log(error);
        }
      }

    async function setChainName() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const network = await provider.getNetwork()
        const chainString = network.name + "(" + network.chainId + ")"
        setChain(chainString);
    }

    React.useEffect(() => {
        setWallet();
        setChainName();
      }, [])

    if (account) return (<><div>Account: {account}</div><div>on {chain}</div> </>);
    else return(<div>onboarding btn</div>);
}



export default Account;