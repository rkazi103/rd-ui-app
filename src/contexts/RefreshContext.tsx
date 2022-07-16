import React, { useContext, useState } from "react";
import { RefreshContextType } from "~/types";

export const RefreshContext = React.createContext<RefreshContextType | null>(
  null
);

const RefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  return (
    <RefreshContext.Provider value={{ isRefreshNeeded, setIsRefreshNeeded }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () =>
  useContext(RefreshContext) as RefreshContextType;

export default RefreshProvider;
