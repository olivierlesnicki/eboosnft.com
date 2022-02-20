import { ethers } from "ethers";

const API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.ALCHEMY_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default async function handler(req, res) {
  const provider = new ethers.providers.AlchemyProvider("ropsten", API_KEY);
  const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
}
