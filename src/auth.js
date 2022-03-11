import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import {
  getDatabase,
  ref,
  serverTimestamp,
  onValue,
  onDisconnect,
  set,
} from "firebase/database";

import app from "./firebaseApp";
import { useMetaMaskAccount } from "./metaMask";

function toHex(_) {
  return _.split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);

    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth);
      } else {
        setUser(user.uid);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const db = getDatabase(app);
      const statusRef = ref(db, `status/${user}`);

      const offline = {
        state: "offline",
        last_changed: serverTimestamp(),
      };

      var online = {
        state: "online",
        last_changed: serverTimestamp(),
      };

      return onValue(ref(db, ".info/connected"), (snapshot) => {
        if (snapshot.val() == false) {
          return;
        }

        onDisconnect(statusRef)
          .set(offline)
          .then(() => set(statusRef, online));
      });
    }
  }, [user]);

  const authenticate = useCallback(async () => {}, []);

  return (
    <AuthContext.Provider value={{ loading, user, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
