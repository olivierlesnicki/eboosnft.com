import "../styles/globals.css";

import { MetaMaskProvider } from "../src/metaMask";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
  );
}

export default MyApp;
