import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BigNumber, ethers, utils } from "ethers";
import useAsyncEffect from "use-async-effect";

import json from "./contract.json";
import { useMetaMaskAccount } from "./metaMask";

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const account = useMetaMaskAccount();

  const [contract, setContract] = useState(null);
  const [blockNumber, setBlockNumber] = useState(0);

  const [immutables, setImmutables] = useState({
    collectionSize: 0,
    premintStartTime: 0,
    reserveSize: 0,
  });

  const [states, setStates] = useState({
    price: BigNumber.from(0),
    totalSupply: 0,
    premintEndTime: 0,
    reserved: 0,
  });

  useEffect(() => {
    if (account) {
      const provider = window.ethereum;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        json.abi,
        signer
      );

      ethersProvider.on("block", setBlockNumber);

      setContract(contract);

      return () => ethersProvider.off("block");
    }
  }, [account]);

  // IMMUTABLE VARIABLES
  useAsyncEffect(
    async (isActive) => {
      if (contract) {
        const names = ["collectionSize", "premintStartTime", "reserveSize"];

        const results = await Promise.all(
          names.map((name) => contract[name]())
        );

        if (isActive()) {
          setImmutables(
            names.reduce((immutables, name, index) => {
              return {
                ...immutables,
                [name]: results[index].toNumber(),
              };
            }, {})
          );
        }
      }
    },
    [contract]
  );

  // STATE VARIABLES
  useAsyncEffect(
    async (isActive) => {
      if (contract) {
        const price = await contract.getPrice();
        const premintEndTime = (await contract.premintEndTime()).toNumber();
        const reserved = (await contract.reserved()).toNumber();
        const totalSupply = (await contract.totalSupply()).toNumber();

        if (isActive()) {
          setStates({
            premintEndTime,
            price,
            reserved,
            totalSupply,
          });
        }
      }
    },
    [contract, blockNumber]
  );

  // FUNCTIONS
  const mint = useCallback(
    async (quantity) => {
      if (contract) {
        let tx;

        if (!states.premintEndTime) {
          tx = await contract.premint(ethers.BigNumber.from(quantity), {
            value: states.price.mul(quantity),
            gasLimit: 200000,
          });
        } else {
          tx = await contract.premint(ethers.BigNumber.from(quantity), {
            value: states.price.mul(quantity),
            gasLimit: 200000,
          });
        }

        return tx.hash;
      }
    },
    [contract, states.premintEndTime, states.price]
  );

  return (
    <ContractContext.Provider value={{ ...immutables, ...states, mint }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  return useContext(ContractContext);
}
