import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  // Global search state
  const [globalSearch, setGlobalSearch] = useState("");
  // Force refresh state
  const [forceRefresh, setForceRefresh] = useState(false);

  return (

    // SearchProvider component
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