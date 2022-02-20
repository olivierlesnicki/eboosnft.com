import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

import { useMetaMask } from "./metaMask";
import useInterval from "./useInterval";

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const { account } = useMetaMask();
  const [contract, setContract] = useState(null);
  const [price, setPrice] = useState("0");

  // Set contract
  useEffect(() => {
    const init = async () => {
      if (account && window.ethereum) {
        const provider = await detectEthereumProvider();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          [
            "function getPrice() view returns (uint256)",
            "function premint(uint256 quantity) payable",
          ],
          signer
        );

        setContract(contract);

        const price = await contract.getPrice();

        setPrice(
          Math.round(
            Number(ethers.utils.formatEther(price.toString())) * 1000
          ) / 1000
        );
      }
    };

    init();
  }, [account]);

  const premint = useCallback(
    async (quantity = 1) => {
      if (contract) {
        const price = await contract.getPrice();

        let tx = await contract.premint(ethers.BigNumber.from(quantity), {
          value: price.mul(quantity),
          gasLimit: 200000,
        });
        console.log(`Transaction hash: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
        console.log(`Gas used: ${receipt.gasUsed.toString()}`);
      }
    },
    [contract]
  );

  return (
    <ContractContext.Provider value={{ premint, price }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  return useContext(ContractContext);
}
