import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import detectProvider from "@metamask/detect-provider";

const MetaMaskContext = createContext();

export function MetaMaskProvider({ children }) {
  const [status, setStatus] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const handleAccountsChanged = useCallback(
    async (accounts) => {
      if (accounts.length) {
        const chain = await provider.request({ method: "eth_chainId" });

        if (chain == 1) {
          setAccount(accounts[0]);
          setStatus(META_MASK_STATUS.CONNECTED);
        } else {
          setAccount(null);
          setStatus(META_MASK_STATUS.INCORRECT_CHAIN);
        }
      } else {
        setAccount(null);
        setStatus(META_MASK_STATUS.NOT_CONNECTED);
      }
    },
    [provider]
  );

  const connect = useCallback(async () => {
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    handleAccountsChanged(accounts);
  }, [handleAccountsChanged, provider]);

  // Detect MetaMask provider
  useEffect(() => {
    let provider;

    const init = async () => {
      provider = await detectProvider();

      if (provider) {
        setProvider(provider);
      } else {
        setStatus(META_MASK_STATUS.NOT_INSTALLED);
      }
    };

    init();

    return () => {};
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on("chainChanged", () => window.location.reload());
      provider.on("accountsChanged", handleAccountsChanged);

      provider.request({ method: "eth_accounts" }).then(handleAccountsChanged);

      return () => {
        provider.removeAllListeners();
      };
    }
  }, [provider, handleAccountsChanged]);

  return (
    <MetaMaskContext.Provider value={{ status, connect, account }}>
      {children}
    </MetaMaskContext.Provider>
  );
}

export function useMetaMask() {
  return useContext(MetaMaskContext);
}

export const META_MASK_STATUS = {
  NOT_INSTALLED: "NOT_INSTALLED",
  NOT_CONNECTED: "NOT_CONNECTED",
  INCORRECT_CHAIN: "INCORRECT_CHAIN",
  CONNECTED: "CONNECTED",
};
