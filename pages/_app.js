import "../styles/globals.css";

import { AuthProvider } from "../src/auth";
import { ContractProvider } from "../src/contract";
import { MetaMaskProvider } from "../src/metaMask";
import { AlchemyProvider } from "../src/alchemy";

function MyApp({ Component, pageProps }) {
  return (
    <AlchemyProvider>
      <MetaMaskProvider>
        <AuthProvider>
          <ContractProvider>
            <Component {...pageProps} />
          </ContractProvider>
        </AuthProvider>
      </MetaMaskProvider>
    </AlchemyProvider>
  );
}

export default MyApp;
