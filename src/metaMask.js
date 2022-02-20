import Onboarding from "@metamask/onboarding";

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

  return (
    <MetaMaskContext.Provider value={{ account, connect, loading, connected }}>
      {children}
    </MetaMaskContext.Provider>
  );
}

export function useMetaMask() {
  return useContext(MetaMaskContext);
}
