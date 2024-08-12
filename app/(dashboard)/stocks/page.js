"use client";
import {
  createOrUpdateStockInput,
  getAllStockInput,
  fetchStockQuote,
} from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import StockTable from "@/components/userStocks/StockTable";
import toast from "react-hot-toast";

const StocksPage = () => {
  const [stockTicker, setStockTicker] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const [userTickerSymbol, setUserTickerSymbol] = useState("");
  const [marketTickerSymbol, setMarketTickerSymbol] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [marketResults, setMarketResults] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const stocks = await getAllStockInput(userId, "");
        setAllStocks(stocks);
      } catch (error) {
        console.log("Error fetching all stocks:", error);
      }
    };
    fetchAllStocks();
  }, [userId, fetchTrigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stockTicker || !amount || !price) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const stockData = {
        stockTicker,
        amount: parseInt(amount, 10),
        price: parseFloat(price),
      };

      const result = await createOrUpdateStockInput(stockData, userId);

      if (result === false) {
        toast.error(
          "No data returned from the server. Please check the stock ticker."
        );
      } else {
        toast.success("Stock information updated successfully.");
        setStockTicker("");
        setAmount("");
        setPrice("");
        setFetchTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error creating or updating stock input:", error);
      toast.error("An error occurred while updating stock information.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const results = await getAllStockInput(userId, userTickerSymbol);

      if (results.length == 0) {
        setMarketResults([]);
        setSearchResults([]);
        toast.error("Please check if your input is correct.");
      } else {
        setMarketResults([]);
        setSearchResults(results);
        console.log(results);
      }
    } catch (error) {
      console.error("Error searching for your stocks:", error);
    }
  };

  const handleSearchMarket = async (e) => {
    e.preventDefault();

    try {
      const results = await fetchStockQuote(marketTickerSymbol);

      if (results.result.d == null) {
        setMarketResults([]);
        setSearchResults([]);
        toast.error("No data available for this stock symbol.");
      } else {
        const resultsArray = [
          {
            stockSymbol: results.stockSymbol.toUpperCase(),
            exists: results.exists,
            ...results.result,
          },
        ];
        setSearchResults([]);
        setMarketResults(resultsArray);
        console.log(resultsArray);
      }
    } catch (error) {
      console.error("Error searching for market stocks:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className=" grid grid-cols-2 grid-rows-3 place-content-start">
          <div className="p-2 bg-neutral rounded-xl shadow-md h-min min-w-min col-span-2">
            <h1 className="text-xl font-bold">Add Stock</h1>
            <form onSubmit={handleSubmit} className="space-x-3 flex col-span-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stock Ticker</span>
                </label>
                <input
                  type="text"
                  value={stockTicker}
                  onChange={(e) => setStockTicker(e.target.value)}
                  className="input input-bordered text-xs"
                  placeholder="AAPL"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered text-xs"
                  placeholder="100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-bordered text-xs"
                  placeholder="150.00"
                />
              </div>
              <button type="submit" className="btn btn-primary text-xs mt-auto">
                Add Stock
              </button>
            </form>
          </div>
          <div className="p-2 bg-neutral rounded-xl shadow-md h-min w-min row-span-1 col-span-1">
            <h1 className="text-xl font-bold">Search Stocks</h1>
            <form onSubmit={handleSearch} className="flex space-x-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Search for your stocks!</span>
                </label>
                <input
                  type="text"
                  value={userTickerSymbol}
                  onChange={(e) => setUserTickerSymbol(e.target.value)}
                  className="input input-bordered text-xs"
                  placeholder="AAPL"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-1/4 text-xs mt-auto"
              >
                Search Stock
              </button>
            </form>
          </div>

          <div className="row-span-1 col-span-1 p-3 bg-base-100 rounded-xl shadow-md h-44 overflow-auto">
            {marketResults.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-primary mb-2">
                  Market Results
                </h2>
                <ul className="list-disc space-y-1">
                  {marketResults.map((result) => (
                    <li
                      key={result.stockSymbol}
                      className="flex flex-col space-y-0.5 text-sm text-primary"
                    >
                      <strong>{result.stockSymbol}</strong>
                      <span>Current Price: {result.c} USD</span>
                      <span>High: {result.h} USD</span>
                      <span>Low: {result.l} USD</span>
                      <span>
                        Change: {result.d} USD ({result.dp}%)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-primary mb-2">
                  Search Results
                </h2>
                <ul className="list-disc  space-y-1">
                  {searchResults.map((stock) => (
                    <li
                      key={stock.id}
                      className="flex flex-col space-y-0.5 text-sm text-primary"
                    >
                      <strong>{stock.stockTicker}</strong>
                      <span>Amount: {stock.amount}</span>
                      <span>Price per Share: ${stock.price}</span>
                      <span>
                        Total Value: ${(stock.amount * stock.price).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex items-center justify-center text-primary h-full">
                <span>No results to display</span>
              </div>
            )}
          </div>

          <div className="p-2 bg-neutral rounded-xl shadow-md h-min w-min row-span-1 col-span-2">
            <h1 className="text-xl font-bold">Current Market</h1>
            <form onSubmit={handleSearchMarket} className="flex space-x-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Search for a stock!</span>
                </label>
                <input
                  type="text"
                  value={marketTickerSymbol}
                  onChange={(e) => setMarketTickerSymbol(e.target.value)}
                  className="input input-bordered text-xs"
                  placeholder="AAPL"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-1/4 text-xs mt-auto"
              >
                Search Stock
              </button>
            </form>
          </div>
        </div>
      </div>

      <StockTable allStocks={allStocks} />
    </>
  );
};

export default StocksPage;

/*Configure layout.
Add Stocks spark chart. (polygonai)
Add and delete stocks.
Add company info hover?
Compare user stock percentage changes.
*/
