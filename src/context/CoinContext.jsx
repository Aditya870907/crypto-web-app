import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValues = {
    allCoin,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider
      value={{ allCoin, currency, setCurrency, setAllCoin }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
