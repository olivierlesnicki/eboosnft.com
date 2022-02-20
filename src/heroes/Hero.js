import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useContract } from "../contract";
import { useMetaMask } from "../metaMask";

export default function Heroe() {
  const { loading, connect, connected } = useMetaMask();
  const [minting, setMintin] = useState();
  const contract = useContract();
  const [quantity, setQuantity] = useState(1);

  const add = useCallback(() => {
    setQuantity((quantity) => Math.min(quantity + 1, 16));
  }, []);

  const remove = useCallback(() => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  }, []);

  const mint = useCallback(async () => {
    contract.premint(quantity);
  }, [contract.premint, quantity]);

  return (
    <div className="min-h-screen pt-16 text-center flex flex-col justify-between items-center">
      <div className="px-8 mb-12 flex flex-col items-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-center mb-8">
          Eboos
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl">
            A collection of 8,192 NFTs living on the Ethereum blockchain. This
            will probably be your first NFT but definetly not your last.
            {/* Owning
            an eboo grants you exclusive access to The Club and voting-power in
            The Museum, a fund to collect blue chip and emerging NFTs as a
            group. */}
          </p>
        </div>
        {!!contract.price && (
          <div className="mt-8 bg-slate-200 py-2 px-3 rounded text-lg">
            <span className="font-bold">PRICE</span> {contract?.price} Ξ
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full max-w-2xl px-16">
          <Image
            height={256}
            width={512}
            layout="responsive"
            src="/images/gold.png"
            priority
          />
        </div>
        {connected ? (
          <>
            <div className="bg-slate-100  p-8 w-full">
              <div className="flex justify-center items-center">
                <button
                  className="text-black bg-black/5 hover:bg-black/10 h-12 w-12 rounded-full font-bold uppercase text-4xl flex items-center justify-center disabled:bg-transparent disabled:opacity-25"
                  disabled={quantity == 1}
                  onClick={remove}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="bg-white rounded px-6 h-12 items-center justify-center flex mx-4 drop-shadow text-lg">
                  {quantity}
                </div>
                <button
                  className="text-black bg-black/5 hover:bg-black/10 h-12 w-12 rounded-full font-bold uppercase text-4xl flex items-center justify-center disabled:bg-transparent disabled:opacity-25"
                  disabled={quantity == 16}
                  onClick={add}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <button
                  className="text-white   bg-blue-500 hover:bg-blue-600 h-12 px-6 rounded-full drop-shadow font-bold uppercase ml-8"
                  onClick={mint}
                  disabled={minting}
                >
                  Mint
                </button>
              </div>
            </div>
            <div className="py-2 bg-blue-500 w-full text-lg text-white">
              <span className="font-bold">TOTAL</span>{" "}
              {Math.round(contract?.price * quantity * 1000) / 1000} Ξ +{" "}
              <span className="italic">gas fees</span>
            </div>
          </>
        ) : (
          <div className="bg-slate-100  p-8 w-full">
            <button
              className="text-white   bg-blue-500 hover:bg-blue-600 disabled:hover:bg-blue-500 h-12 px-6 rounded-full drop-shadow font-bold uppercase"
              onClick={connect}
              disabled={loading}
            >
              {loading ? "Loading..." : "Connect with MetaMask"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
