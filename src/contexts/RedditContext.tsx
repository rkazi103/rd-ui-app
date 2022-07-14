import React, { useContext, useState } from "react";
import { RedditContextType } from "~/types";

export const RedditContext = React.createContext<RedditContextType | null>(
  null
);

const RedditProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  return (
    <RedditContext.Provider value={{ isRefreshNeeded, setIsRefreshNeeded }}>
      {children}
    </RedditContext.Provider>
  );
};

export const useRedditContext = () =>
  useContext(RedditContext) as RedditContextType;

export default RedditProvider;
