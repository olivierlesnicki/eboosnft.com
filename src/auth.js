import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import app from "./firebaseApp";
import { useMetaMaskAccount } from "./metaMask";

function toHex(_) {
  return _.split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const account = useMetaMaskAccount();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);

    return onAuthStateChanged(auth, (user) => {
      setUser(user?.uid || null);
      setLoading(false);
    });
  }, []);

  const authenticate = useCallback(async () => {
    const auth = getAuth(app);
    const provider = window.ethereum;

    // Nonce
    const nonceRequest = await axios.post("/api/auth/nonce", {
      address: account,
    });
    const { nonce } = nonceRequest.data;

    const signature = await provider.request({
      method: "personal_sign",
      params: [`0x${toHex(nonce)}`, account],
    });

    // Verify
    const tokenRequest = await axios.post("/api/auth/token", {
      address: account,
      signature,
    });
    const { token } = tokenRequest.data;

    // Sign In With Custom Token
    await signInWithCustomToken(auth, token);
  }, [account]);

  useEffect(() => {
    if (user && account && user != account) {
      const auth = getAuth(app);
      signOut(auth);
    }
  }, [user, account]);

  return (
    <AuthContext.Provider value={{ loading, user, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
