import "../styles/globals.css";

import { AuthProvider } from "../src/auth";
import { ContractProvider } from "../src/contract";
import { MetaMaskProvider } from "../src/metaMask";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <AuthProvider>
        <ContractProvider>
          <Component {...pageProps} />
        </ContractProvider>
      </AuthProvider>
    </MetaMaskProvider>
  );
}

export default MyApp;
