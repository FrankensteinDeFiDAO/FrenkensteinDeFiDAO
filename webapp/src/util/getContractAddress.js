import deployment from './deployment.json'
import { ethers } from 'ethers'
 
async function getContractAddress(name) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
console.log("Contract: ", name, " ChainID: ", network.chainId, " Address: ", deployment[name][network.chainId])
    return deployment[name][network.chainId]
}

export default getContractAddress;
