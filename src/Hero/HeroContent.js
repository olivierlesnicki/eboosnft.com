import Image from "next/image";

export default function HeroContent({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center text-slate-900">
      <div className="px-8 text-center">
        <h1 className="mt-16 text-6xl sm:text-8xl font-bold mb-8">Eboos</h1>
        <div className="mb-12 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl">
          A collection of 8,192 <span className="tracking-tight">NFTs</span>{" "}
          living on the Ethereum blockchain. This will probably be your first{" "}
          <span className="tracking-tight">NFT</span> but{" "}
          <span className="tracking-tight">definitely</span> not your last.
        </div>
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
