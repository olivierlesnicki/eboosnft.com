import { createContext, useContext, useMemo } from "react";

const PriceContext = createContext();

export function PriceProvider({ children }) {
  return <PriceContext.Provider value={null}>{children}</PriceContext.Provider>;
}

export function usePrice() {
  return useContext(PriceContext);
}
