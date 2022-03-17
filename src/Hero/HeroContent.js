import Image from "next/image";

import { utils } from "ethers";
import { useAlchemy } from "../alchemy";

export default function HeroContent({ children }) {
  const alchemy = useAlchemy();

  return (
    <div className="min-h-screen flex flex-col justify-between items-center text-slate-900">
      <div className="px-8 text-center">
        <h1 className="mt-16 text-6xl sm:text-8xl font-bold mb-8">Eboos</h1>
        <div className="mb-8 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl">
          A collection of 8,192 <span className="tracking-tight">NFTs</span>{" "}
          living on the Ethereum blockchain. This will probably be your first{" "}
          <span className="tracking-tight">NFT</span> but{" "}
          <span className="tracking-tight">definitely</span> not your last.
        </div>
        {!alchemy.loading && (
          <div className="mb-8 grid grid-cols-2  divide-x divide-slate-200">
            <div className="py-4">
              <div className="uppercase text-sm text-slate-400">
                Current Price
              </div>
              <div className="font-bold text-xl sm:text-4xl">
                {utils.formatEther(alchemy.price)} Ξ
              </div>
            </div>
            <div className="py-4">
              <div className="uppercase text-sm text-slate-400">
                Total Supply
              </div>
              <div className="font-bold text-xl sm:text-4xl">
                {alchemy.totalSupply} / 8192
              </div>
            </div>
          </div>
        )}
        <div>{children}</div>
      </div>
      <div className="relative w-full max-w-2xl px-16 mt-12">
        <Image
          height={256}
          width={512}
          layout="responsive"
          src="/images/gold.png"
          priority
        />
      </div>
    </div>
  );
}
