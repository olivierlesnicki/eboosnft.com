import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Image from "next/image";
import useAsyncEffect from "use-async-effect";
import Spinner from "../../src/Spinner";

import json from "../../src/contract.json";

export default function Hash() {
  const router = useRouter();
  const [loadingTx, setLoadingTx] = useState(true);
  const [tx, setTx] = useState(null);
  const [error, setError] = useState(null);
  const { hash } = router.query;

  useAsyncEffect(async (isValid) => {
    const provider = window.ethereum;
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const iface = new ethers.utils.Interface(json.abi);

    const tx = await ethersProvider.getTransaction(hash);
    //const quantity = iface.decodeFunctionData("premint", tx.data)[0].toNumber();

    if (isValid()) {
      if (!tx) {
        return router.push("/");
      }
      setLoadingTx(false);
    }

    try {
      await tx.wait();

      if (isValid()) {
        setTx(tx);
      }
    } catch (e) {
      setError(tx.hash);
    }
  }, []);

  if (loadingTx) return null;

  if (!tx) {
    return (
      <div className="flex flex-col items-center text-slate-900 px-8 text-center">
        <h1 className="mt-16 text-6xl sm:text-8xl font-bold mb-8">
          Minting...
        </h1>
        <div className="mb-12 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl">
          Your transaction is being processed. <br />
          Do not close or refresh this window.
        </div>
        <Spinner className="animate-spin text-slate-300 fill-blue-500 w-12 h-12" />
        <div className="mt-4 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-slate-400">
          This can take up to one minute.
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-slate-900 px-8 text-center">
        <h1 className="mt-16 text-6xl sm:text-8xl font-bold mb-8">Error</h1>
        <div className="mb-12 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl">
          Your transaction has failed.
          <br /> Find more details on block explorer <br />
          <br />
          <a
            href={`https://etherscan.io/tx/${error}`}
            className="text-blue-400 hover:text-blue-600"
          >
            etherscan.io/{tx.hash.substring(0, 6)}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-slate-900 px-8 text-center">
      <h1 className="mt-16 text-6xl sm:text-8xl font-bold mb-8">Success</h1>
      <div className="mb-12 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl">
        Your transaction is complete.
        <br /> Find more details on block explorer <br />
        <br />
        <a
          href={`https://etherscan.io/tx/${tx.hash}`}
          className="text-blue-400 hover:text-blue-600"
        >
          etherscan.io/{tx.hash.substring(0, 6)}
        </a>
      </div>
    </div>
  );
}
