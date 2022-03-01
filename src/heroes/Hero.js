import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { utils } from "ethers";
import Countdown from "react-countdown";
import { useRouter } from "next/router";

import { useContract } from "../contract";
import AddIcon from "../AddIcon";
import RemoveIcon from "../RemoveIcon";

export default function Hero() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const {
    collectionSize,
    reserveSize,
    reserved,
    totalSupply,
    price,
    premintStartTime,
    premintEndTime,
    mint,
  } = useContract();

  let available = collectionSize - reserveSize + reserved - totalSupply;
  let isMint = !!premintEndTime;
  let isPremint = !isMint && premintStartTime <= Date.now() / 1000;

  if (premintEndTime == 0) {
    available =
      Math.floor((Date.now() / 1000 - premintStartTime) / (24 * 3600) + 1) *
        16 -
      totalSupply +
      reserved;
  }

  const add = useCallback(() => {
    setQuantity((quantity) =>
      Math.min(quantity + 1, available, premintEndTime ? 5 : 8)
    );
  }, [available, premintEndTime]);

  const remove = useCallback(() => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  }, []);

  useEffect(() => {
    setQuantity((_) => Math.min(available, _));
  }, [available]);

  const handleMint = useCallback(async () => {
    const hash = await mint(quantity);
    window.location = "https://etherscan.io/tx/" + hash;
  }, [quantity, router]);

  return (
    <div className="min-h-screen pt-16 text-center flex flex-col justify-between items-center">
      <div className="px-8 mb-12 flex flex-col items-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-center mb-8">
          Eboos
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl">
            A collection of 8,192 NFTs living on the Ethereum blockchain. This
            will probably be your first NFT but definitly not your last.
          </p>
        </div>
        <>
          <div className=" w-full my-12">
            <div className="flex items-center justify-center max-w-3xl mx-auto divide-x-2">
              <div className="flex-1 py48">
                <div className="font-bold uppercase text-slate-400 tracking-wide">
                  Price
                </div>
                <div className="text-3xl sm:text-5xl text-slate-900">
                  <> {utils.formatEther(price)} Ξ</>
                </div>
              </div>
              <div className="flex-1 py-4">
                <div className="font-bold uppercase text-slate-400 tracking-wide">
                  Supply
                </div>
                <div className="text-3xl sm:text-5xl text-slate-900">
                  {totalSupply} / {collectionSize}
                </div>
              </div>
            </div>
          </div>
          {isPremint && (
            <div className="text-xl sm:text-2xl max-w-2xl mb-8">
              {available < 16 ? (
                <>
                  We release 16 eboos every day. <br />
                </>
              ) : null}
              {available ? (
                <>There are {available} eboos available today.</>
              ) : (
                <>Come back later.</>
              )}
            </div>
          )}
          <div className="p-8 px-16 bg-slate-200 rounded-2xl">
            {isMint || isPremint ? (
              !!available ? (
                <div className="flex items-center justify-center mb-4">
                  <button
                    className="text-black bg-black/5 hover:bg-black/10 h-12 w-12 rounded-full font-bold uppercase text-4xl flex items-center justify-center disabled:bg-transparent disabled:opacity-25"
                    disabled={quantity == 1}
                    onClick={remove}
                  >
                    <RemoveIcon className="h-6 w-6" />
                  </button>
                  <div className="bg-white rounded px-6 h-12 items-center justify-center flex mx-4 drop-shadow text-lg">
                    {quantity}
                  </div>
                  <button
                    className="text-black bg-black/5 hover:bg-black/10 h-12 w-12 rounded-full font-bold uppercase text-4xl flex items-center justify-center disabled:bg-transparent disabled:opacity-25"
                    disabled={
                      quantity == Math.min(available, premintEndTime ? 5 : 8)
                    }
                    onClick={add}
                  >
                    <AddIcon className="h-6 w-6" />
                  </button>
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-600 h-12 px-6 rounded-full font-bold ml-8 text-lg"
                    onClick={handleMint}
                  >
                    Mint
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <>
                    <div className="font-bold uppercase text-slate-400 tracking-wide">
                      Countdown
                    </div>
                    <div className="text-2xl text-slate-900 tracking-wide">
                      <Countdown
                        date={
                          (premintStartTime +
                            (Math.floor(
                              (Date.now() / 1000 - premintStartTime) /
                                (24 * 3600)
                            ) +
                              1) *
                              24 *
                              3600) *
                          1000
                        }
                      />
                    </div>
                  </>
                </div>
              )
            ) : (
              <div className="flex items-center justify-center flex-col">
                <>
                  <div className="font-bold uppercase text-slate-400 tracking-wide">
                    Countdown
                  </div>
                  <div className="text-2xl text-slate-900 tracking-wide">
                    <Countdown date={premintStartTime * 1000}></Countdown>
                  </div>
                </>
              </div>
            )}
          </div>
          {(isMint || isPremint) && !!available && (
            <div className="py-2 -mt-5 bg-blue-500 text-lg text-white px-8 rounded">
              <span className="font-bold tracking-wide uppercase">TOTAL</span>{" "}
              {utils.formatEther(price.mul(quantity))} Ξ +{" "}
              <span className="italic">gas fees</span>
            </div>
          )}
        </>
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        <div className="relative w-full max-w-2xl px-16">
          <Image
            height={256}
            width={512}
            layout="responsive"
            src="/images/gold.png"
            priority
          />
        </div>
      </div>
    </div>
  );
}
