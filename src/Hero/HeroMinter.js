import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { utils } from "ethers";

import AddIcon from "../AddIcon";
import RemoveIcon from "../RemoveIcon";

export default function HeroMinter({ max, mint, price, available }) {
  const [minting, setMinting] = useState(false);
  const [hash, setHash] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

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
    setMinting(true);

    try {
      const tx = await mint(quantity);

      setHash(tx.hash);
    } catch (e) {
      setMinting(false);
      return;
    }
  }, [quantity, router]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl sm:text-2xl max-w-2xl mb-8">
        We release 16 eboos every day. <br />
        There are <span className="font-bold">{available}</span> eboos available
        today.
      </div>
      {minting ? (
        <div className="text-lg">
          <div className="p-8 px-16 bg-slate-200 rounded-2xl">
            {hash ? (
              <>
                Transaction in progress...
                <br /> Do not close or refresh this page.
              </>
            ) : (
              "Review your transaction in MetaMask."
            )}
          </div>
        </div>
      ) : (
        <>
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
                disabled={minting}
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
