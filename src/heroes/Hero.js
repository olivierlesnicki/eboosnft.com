import Image from "next/image";

export default function Heroe() {
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
          </p>
        </div>
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
      </div>
    </div>
  );
}
