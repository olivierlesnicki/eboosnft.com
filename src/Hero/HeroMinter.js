import { useCallback, useEffect, useState } from "react";
import { utils } from "ethers";
import {
  getDatabase,
  ref,
  set,
  serverTimestamp,
  get,
  query,
  orderByValue,
  startAt,
  endAt,
} from "firebase/database";

import app from "../../src/firebaseApp";

import AddIcon from "../AddIcon";
import RemoveIcon from "../RemoveIcon";

export default function HeroMinter({ max, onMint, price, available, user }) {
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState(false);

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
    const db = getDatabase(app);
    const snapshot = await get(
      query(ref(db, "minters"), orderByValue(), startAt(Date.now() - 30 * 1000))
    );

    if (snapshot.size > 10) {
      setWarning(snapshot.size);
    } else {
      await set(ref(db, `minters/${user}`), serverTimestamp());
      onMint(quantity);
    }
  }, [onMint, quantity, user]);

  const forceMint = useCallback(async () => {
    const db = getDatabase(app);
    await set(ref(db, `minters/${user}`), serverTimestamp());
    onMint(quantity);
  }, [onMint, quantity]);

  const cancelMint = useCallback(() => {
    setWarning(0);
  }, []);

  if (warning > 0) {
    return (
      <div className="text-lg flex flex-col items-center">
        <div className="p-8 px-16 bg-slate-200 rounded-2xl flex flex-col items-center  max-w-xl">
          <div>
            There are more than {warning} other people trying to mint an Eboo
            right now. There's a chance your transaction will be rejected by the
            network.
          </div>
          <div className="mt-8 flex ">
            <button
              className="h-12 w-32 px-6 bg-slate-300 rounded-lg hover:bg-slate-400 mr-4 font-bold"
              onClick={cancelMint}
            >
              Cancel
            </button>
            <button
              className="h-12 w-32 px-6 bg-blue-500 rounded-lg text-white hover:bg-blue-600 font-bold"
              onClick={forceMint}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl sm:text-2xl max-w-2xl mb-8">
        We release 16 eboos every day. <br />
        There are <span className="font-bold">{available}</span> eboos available
        today.
      </div>
      <div className="p-8 px-16 bg-slate-200 rounded-2xl">
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
    </div>
  );
}
