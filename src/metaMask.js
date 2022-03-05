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

import HeroContent from "./Hero/HeroContent";

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
      <HeroContent>
        <button
          className="mt-12 mx-auto bg-slate-200 hover:bg-slate-300 h-14 px-4 text-lg font-bold rounded-lg flex items-center"
          onClick={connect}
        >
          <Image height={36} width={36} src="/images/metamask.png" />
          <div className="mx-2">Connect with MetaMask</div>
        </button>
      </HeroContent>
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
