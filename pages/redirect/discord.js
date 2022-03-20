import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import axios from "axios";

import sign from "../../src/lib/sign";
import discord from "../../src/lib/discord";
import { MetaMaskButton, useMetaMaskAccount } from "../../src/metaMask";

export default function Discord() {
  const account = useMetaMaskAccount();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const { access_token, error } = qs.parse(hash);

    if (error) {
      setError(error);
    }

    discord(access_token).getUser().then(setUser);
  }, [router.query]);

  const link = useCallback(async () => {
    // Get a nonce
    const nonceRes = await axios.post("/api/auth/nonce", { address: account });
    const { nonce } = nonceRes.data;

    // Sign the nonce
    const signature = sign(nonce, account);

    // Link the discord
    const resConnect = await axios.post("/api/discord/connect", {
      address: account,
      signature,
    });

    // Forward
  }, [account]);

  if (!error && !user) {
    return (
      <div className="bg-indigo-500 h-screen flex items-center justify-center w-full bg-gradient-to-br from-indigo-400 to-indigo-600"></div>
    );
  }

  if (error) {
    return (
      <div className="bg-indigo-500 h-screen flex items-center justify-center w-full bg-gradient-to-br from-indigo-400 to-indigo-600"></div>
    );
  }

  return (
    <div className="bg-indigo-500 h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-indigo-50">
      <div className="max-w-md sm:max-w-xl mx-auto text-xl sm:text-2xl mb-8 text-center">
        Almost there <span className="font-bold">{user.username}</span>! Your
        wallet will ask you to digitally sign in to connect it with Discord.
      </div>

      <MetaMaskButton onClick={link}>Continue</MetaMaskButton>
    </div>
  );
}
