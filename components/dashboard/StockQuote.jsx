import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";

const basePath = "https://finnhub.io/api/v1";

export const fetchStockQuote = async (stockSymbol) => {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=cqktuj1r01qr0sv0ki7gcqktuj1r01qr0sv0ki80`;
  console.log(`Fetching stock quote from: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

const StockQuote = ({ stockSymbol }) => {
  const [stockQuote, setStockQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStockQuote = async () => {
      try {
        const data = await fetchStockQuote(stockSymbol);
        setStockQuote(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadStockQuote();
  }, [stockSymbol]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {stockQuote ? (
        <DashboardCard stockQuote={stockQuote} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockQuote;
