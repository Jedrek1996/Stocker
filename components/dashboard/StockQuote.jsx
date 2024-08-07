import { useEffect, useState } from "react";
import { fetchStockQuote } from "../../utils/action";
import DashboardCard from "./DashboardCard";

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
