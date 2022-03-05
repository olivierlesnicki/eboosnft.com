import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Tx() {
  const router = useRouter();
  const { hash } = router.query;
  const [quantity, setQuantity] = useState(null);
  const [tx, setTx] = useState(null);

  // Instantiate contract
  useEffect(() => {
    const init = async () => {
      const provider = window.ethereum;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const iface = new ethers.utils.Interface([
        "function premint(uint256)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed value)",
      ]);

      const tx = await ethersProvider.getTransaction(hash);
      const quantity = iface
        .decodeFunctionData("premint", tx.data)[0]
        .toNumber();

      setTx(tx);
      setQuantity(quantity);

      try {
        const receipt = await tx.wait();

        console.log(
          receipt.logs
            .filter(
              (_) =>
                _.topics.includes(iface.getEventTopic("Transfer")) &&
                _.topics.length == 4
            )
            .map((log) => iface.parseLog(log))
        );
      } catch (e) {
        let code = await ethersProvider.call(tx, tx.blockNumber);
        console.log("revert reason:", reason);
      }
    };

    if (hash) init();
  }, [hash]);

  if (!tx) return null;

  if (tx.confirms == 0)
    return (
      <div className="py-16">
        <div className="px-8 flex flex-col items-center">
          <h1 className="text-6xl sm:text-8xl font-bold text-center mb-8">
            Minting...
          </h1>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xl sm:text-2xl">
              Your transaction is being processed by the Ethereum network. It
              shouldn&apos;t take more than a couple of minutes.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full mx-auto max-w-4xl">
            {[...Array(quantity)].map((value, key) => (
              <div key={key} className="flex-1">
                <div className="aspect-square w-full rounded-2xl bg-slate-200 animate-pulse">
                  <Image
                    src="/images/default_eboo.png"
                    height={256}
                    width={256}
                    layout="responsive"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="py-16">
      <div className="px-8 flex flex-col items-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-center mb-8">
          Minted!
        </h1>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xl sm:text-2xl">
            Here are the eboos that were minted.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full mx-auto max-w-4xl">
          {[...Array(quantity)].map((value, key) => (
            <div key={key} className="flex-1">
              <div className="aspect-square w-full rounded-2xl bg-slate-200 animate-pulse">
                <Image
                  src="/images/default_eboo.png"
                  height={256}
                  width={256}
                  layout="responsive"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
