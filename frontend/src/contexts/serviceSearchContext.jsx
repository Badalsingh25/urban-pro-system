import { createContext, useContext, useState, useEffect } from "react";

// Create context
const ServiceSearchContext = createContext();

// Provider component
export const ServiceSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTermState] = useState("");

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("service-search", JSON.stringify(searchTerm));
    } else {
      localStorage.removeItem("service-search");
    }
  }, [searchTerm]);

  const setSearchTerm = (term) => {
    setSearchTermState(term);
  };

  const clearSearch = () => {
    setSearchTermState("");
  };

  return <ServiceSearchContext.Provider value={{ searchTerm, setSearchTerm, clearSearch }}>{children}</ServiceSearchContext.Provider>;
};

// Custom hook for consuming context
// eslint-disable-next-line react-refresh/only-export-components
export const useServiceSearch = () => useContext(ServiceSearchContext);
