import "../styles/globals.css";

import { MetaMaskProvider } from "../src/metaMask";
import { ContractProvider } from "../src/contract";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <ContractProvider>
        <Component {...pageProps} />
      </ContractProvider>
    </MetaMaskProvider>
  );
}

export default MyApp;
