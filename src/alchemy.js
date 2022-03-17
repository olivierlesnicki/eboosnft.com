import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { utils, BigNumber } from "ethers";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import json from "./contract.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const web3 = createAlchemyWeb3(ALCHEMY_KEY);
const ebooContract = new web3.eth.Contract(json.abi, CONTRACT_ADDRESS);

async function getContract() {
  const [premintStartTime, premintEndTime, reserved, totalSupply] =
    await Promise.all([
      ebooContract.methods.premintStartTime().call(),
      ebooContract.methods.premintEndTime().call(),
      ebooContract.methods.reserved().call(),
      ebooContract.methods.totalSupply().call(),
    ]);

  return {
    premintStartTime: Number(premintStartTime),
    premintEndTime: Number(premintEndTime),
    reserved: Number(reserved),
    totalSupply: Number(totalSupply),
  };
}

const AlchemyContext = createContext();

export function AlchemyProvider({ children }) {
  const collectionSize = 8192;
  const reserveSize = 128;
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState({
    premintStartTime: 0,
    premintEndTime: 0,
    reserved: 0,
    totalSupply: 0,
  });

  const refresh = useCallback(async () => {
    const contract = await getContract();

    setContract(contract);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();

    const subscription = ebooContract.events.Transfer();
    subscription.on("data", (e) => refresh());
    return () => subscription.off();
  }, []);

  let timeElapsed,
    size,
    currentDay,
    price,
    available,
    hasPremintStarted,
    hasPremintEnded,
    hasMintStarted,
    isMintEnded,
    day,
    nextPremintDropTime;

  if (!loading) {
    timeElapsed = Date.now() - contract.premintStartTime * 1000;
    currentDay = Math.floor(timeElapsed / 86400000);

    // State
    hasPremintStarted = contract.premintStartTime <= Date.now() / 1000;
    hasPremintEnded = !contract.premintEndTime;
    hasMintStarted = !!contract.premintEndTime;
    isMintEnded = contract.totalSupply == collectionSize;

    // Availability
    size = hasPremintEnded
      ? (currentDay + 1) * 16
      : collectionSize - reserveSize;
    available = size - contract.totalSupply + contract.reserved;

    // Price calculations
    day = available > 0 ? currentDay : currentDay + 1;
    price = utils.parseEther("0.001").mul(BigNumber.from(day + 1));

    nextPremintDropTime =
      contract.premintStartTime +
      (Math.floor(
        (Date.now() / 1000 - contract.premintStartTime) / (24 * 3600)
      ) +
        1) *
        24 *
        3600;
  }

  return (
    <AlchemyContext.Provider
      value={{
        loading,
        collectionSize,
        reserveSize,
        price,
        nextPremintDropTime,
        hasPremintStarted,
        hasPremintEnded,
        hasMintStarted,
        isMintEnded,
        available,
        day,
        refresh,
        ...contract,
      }}
    >
      {children}
    </AlchemyContext.Provider>
  );
}

export function useAlchemy() {
  return useContext(AlchemyContext);
}
