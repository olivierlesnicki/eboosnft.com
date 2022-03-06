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

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

const MetaMaskContext = createContext({});

export function MetaMaskProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connected, setConnected] = useState(false);

  const [accountLoading, setAccountLoading] = useState(true);
  const [chainIdLoading, setChainIdLoading] = useState(true);

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
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged);

      window.ethereum
        .request({ method: "eth_chainId" })
        .then(handleChainIdChanged);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());

      return () => window.ethereum.removeAllListeners();
    } else {
      setAccountLoading(false);
      setChainIdLoading(false);
    }
  }, []);

  const handleChainIdChanged = useCallback((chainId) => {
    setChainId(chainId);
    setChainIdLoading(false);
  }, []);

  const handleAccountsChanged = useCallback((accounts) => {
    setAccount(accounts?.length > 0 ? accounts[0] : null);
    setAccountLoading(false);
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

  const switchChain = useCallback(async () => {
    window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_ID }],
      })
      .then(handleAccountsChanged);
  }, []);

  if (accountLoading || chainIdLoading) return null;

  if (!connected) {
    return (
      <HeroContent>
        <MetaMaskButton className="mx-auto" onClick={connect}>
          Connect with MetaMask
        </MetaMaskButton>
      </HeroContent>
    );
  }

  if (CHAIN_ID != chainId) {
    return (
      <HeroContent>
        <div className="flex justify-center">
          <div className="text-white bg-red-500 px-6 py-4 mb-8 rounded-lg bold">
            Your wallet isn't connected to the correct network.
          </div>
        </div>
        <MetaMaskButton className="mx-auto" onClick={switchChain}>
          Change network
        </MetaMaskButton>
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

export function MetaMaskButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-slate-200 hover:bg-slate-300 h-14 px-4 text-lg font-bold rounded-lg flex items-center ${className}`}
    >
      <Image height={36} width={36} src="/images/metamask.png" />
      <div className="mx-2">{children}</div>
    </button>
  );
}
