import Image from "next/image";
import { useCallback, useMemo } from "react";

import { useMetaMask, META_MASK_STATUS } from "../src/metaMask";

function MetaMaskConnectButton() {
  const { status, connect, account } = useMetaMask();

  const click = useCallback(() => {
    switch (status) {
      case META_MASK_STATUS.NOT_INSTALLED:
        window.location = "https://metamask.io/";
        break;
      case META_MASK_STATUS.NOT_CONNECTED:
        connect();
        break;
      default:
        return;
    }
  }, [status]);

  let text = useMemo(() => {
    switch (status) {
      case META_MASK_STATUS.NOT_INSTALLED:
        return "Install MetaMask";
        break;
      case META_MASK_STATUS.NOT_CONNECTED:
        return "Connect to MetaMask";
        break;
      case META_MASK_STATUS.INCORRECT_CHAIN:
        return "Switch to main network";
        break;
      default:
        return "Loading";
    }
  }, [status]);

  return (
    <button
      className="uppercase md:ml-8 drop-shadow bg-white px-6 py-2 font-bold rounded-md flex items-center hover:bg-slate-50 disabled:bg-transparent disabled:border-yellow-500 disabled:border-2 disabled:drop-shadow-none disabled:opacity-50"
      disabled={!status || status === META_MASK_STATUS.INCORRECT_CHAIN}
      onClick={click}
    >
      <Image src="/metamask.png" height={36} width={36} />
      <div className="ml-2">
        {status === META_MASK_STATUS.CONNECTED ? (
          <div>Connected: {account.substring(0, 6)}...</div>
        ) : (
          text
        )}
      </div>
    </button>
  );
}

export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex drop-shadow-xl">
        <div className="m-auto flex flex-col items-center">
          <div className="max-w-md text-center px-2 mt-16">
            <div className="mb-8 text-3xl md:text-5xl komika">
              8,192 eboos who just want to have fun
            </div>
            <div className="mb-8 md:mb-16 text-xl md:text-2xl">
              A fresh NFT collection with a real purpose: simplify the mass
              adoption of NFTs to support artists and creators.
            </div>
          </div>
          <div style={{ fontSize: 0 }}>
            <Image
              src="/default_eboo.png"
              height={256}
              width={256}
              className="block"
            />
          </div>
          <div className="md:flex p-4 bg-yellow-400 rounded-lg items-center mb-16">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="uppercase opacity-50 text-xs">
                Premint begins soon
              </div>
              <div className="uppercase bold font-bold">Mid-february</div>
            </div>
            <MetaMaskConnectButton />
          </div>
        </div>
      </div>
    </>
  );
}
