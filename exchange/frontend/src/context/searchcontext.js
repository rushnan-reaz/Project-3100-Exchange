import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [forceRefresh, setForceRefresh] = useState(false);

  return (
    <SearchContext.Provider value={{ 
      globalSearch, 
      setGlobalSearch,
      forceRefresh, 
      setForceRefresh 
    }}>
      {children}
    </SearchContext.Provider>
  );
}