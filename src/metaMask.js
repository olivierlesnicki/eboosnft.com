import Onboarding from "@metamask/onboarding";
import Image from "next/image";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

const MetaMaskContext = createContext({});

export function MetaMaskProvider({ children }) {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new Onboarding();
    }
  }, []);

  useEffect(() => {
    if (Onboarding.isMetaMaskInstalled()) {
      if (account) {
        setConnected(true);
        onboarding.current.stopOnboarding();
      } else {
        setConnected(false);
      }
    }
  }, [account]);

  useEffect(() => {
    if (Onboarding.isMetaMaskInstalled()) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        handleAccountsChanged(accounts);
        setLoading(false);
      });

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());

      return () => window.ethereum.removeAllListeners();
    } else {
      setLoading(false);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts = []) => {
    setAccount(accounts.length > 0 ? accounts[0] : null);
  }, []);

  const connect = useCallback(() => {
    if (Onboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountsChanged);
    } else {
      onboarding.current.startOnboarding();
    }
  }, []);

  if (loading) return null;

  if (!connected) {
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
          <button
            className="mt-12 bg-slate-200 hover:bg-slate-300 h-14 px-4 text-lg font-bold rounded flex items-center"
            onClick={connect}
          >
            <Image height={36} width={36} src="/images/metamask.png" />
            <div className="mx-2">Connect with MetaMask</div>
          </button>
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

  return (
    <MetaMaskContext.Provider value={account}>
      {children}
    </MetaMaskContext.Provider>
  );
}

export function useMetaMaskAccount() {
  return useContext(MetaMaskContext);
}
