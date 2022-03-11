import { useCallback, useEffect, useState } from "react";
import { utils } from "ethers";
import {
  getDatabase,
  ref,
  query,
  onValue,
  equalTo,
  orderByChild,
} from "firebase/database";

import app from "../../src/firebaseApp";

import AddIcon from "../AddIcon";
import RemoveIcon from "../RemoveIcon";

export default function HeroMinter({ max, onMint, price, available }) {
  const [quantity, setQuantity] = useState(1);
  const [onlineCount, setOnlines] = useState(0);
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  useEffect(() => {
    setQuantity((_) => Math.min(available, _));
  }, [available]);

  const add = useCallback(() => {
    setQuantity((quantity) => Math.min(quantity + 1, available, max));
  }, [available, max]);

  const remove = useCallback(() => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  }, []);

  const handleMint = useCallback(async () => {
    if (onlineCount >= 1) {
      setIsWarningVisible(true);
    } else {
      onMint(quantity);
    }
  }, [onMint, quantity, onlineCount]);

  const handleForceMint = useCallback(async () => {
    onMint(quantity);
  }, [onMint, quantity]);

  const cancel = useCallback(() => {
    setIsWarningVisible(false);
  }, []);

  useEffect(() => {
    const db = getDatabase(app);
    return onValue(
      query(ref(db, "status"), orderByChild("state"), equalTo("online")),
      (snapshot) => {
        setOnlines(Math.max(snapshot.size, 0));
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl sm:text-2xl max-w-2xl mb-8">
        We release 16 eboos every day. <br />
        There are <span className="font-bold">{available}</span> eboos available
        today.
      </div>
      <div className="mb-8 max-w-lg max-auto">
        <div className="px-4 flex items-center bg-slate-100 h-10 text-sm rounded">
          <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>{" "}
          &nbsp; Number of buyers online &nbsp;
          <span className="font-bold">{onlineCount}</span>
        </div>
      </div>
      {isWarningVisible ? (
        <>
          <div className="p-8 bg-slate-200 rounded-2xl max-w-lg text-left">
            <div>
              There are a high number of buyers but only a few eboos left.
              There's a chance your transaction will fail. Please be aware of
              the risks before continuing.
            </div>
            <div className="mt-8 flex justify-center">
              <button
                className="text-blue-500 border-blue-500 border-2 hover:bg-blue-100 h-12 w-32 rounded-lg font-bold text-lg cursor-pointer"
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 h-12 w-32 rounded-lg font-bold ml-8 text-lg cursor-pointer"
                onClick={handleForceMint}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-8 px-16 bg-slate-200 rounded-2xl">
            <div className="group flex items-center justify-center mb-4">
              <button
                className="text-slate-600 bg-slate-300 hover:bg-slate-400 h-12 w-12 rounded-full font-bold uppercase text-4xl flex items-center justify-center disabled:bg-transparent disabled:text-slate-300 transition-colors"
                disabled={quantity == 1}
                onClick={remove}
              >
                <RemoveIcon className="h-6 w-6" />
              </button>
              <div className="font-bold bg-white rounded-lg px-6 h-12 items-center justify-center flex mx-4 drop-shadow text-lg select-none">
                {quantity}
              </div>
              <button
                className="text-slate-600 bg-slate-300 hover:bg-slate-400 h-12 w-12 rounded-full font-bold uppercase text-4xl flex items-center justify-center disabled:bg-transparent disabled:text-slate-300 transition-colors"
                disabled={quantity == Math.min(available, max)}
                onClick={add}
              >
                <AddIcon className="h-6 w-6" />
              </button>
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 h-12 px-6 rounded-lg font-bold ml-8 text-lg cursor-pointer"
                onClick={handleMint}
              >
                Mint
              </button>
            </div>
          </div>
          <div className="py-2 -mt-5 bg-blue-500 text-lg text-white px-8 rounded drop-shadow">
            <span className="font-bold tracking-wide uppercase">TOTAL</span>{" "}
            {utils.formatEther(price.mul(quantity))} Ξ +{" "}
            <span className="italic">gas fees</span>
          </div>
        </>
      )}
    </div>
  );
}
