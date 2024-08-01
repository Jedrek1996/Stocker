"use client";
import { createOrUpdateStockInput, getAllStockInput } from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const StocksPage = () => {
  const [stockTicker, setStockTicker] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const [searchStock, setSearchStock] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { userId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stockTicker || !amount || !price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const stockData = {
        stockTicker,
        amount: parseInt(amount, 10),
        price: parseFloat(price),
      };

      await createOrUpdateStockInput(stockData, userId);
      setStockTicker("");
      setAmount("");
      setPrice("");
    } catch (error) {
      console.error("Error creating or updating stock input:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const results = await getAllStockInput(userId, searchStock);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for stocks:", error);
    }
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-neutral rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Add Stock</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock Ticker</span>
            </label>
            <input
              type="text"
              value={stockTicker}
              onChange={(e) => setStockTicker(e.target.value)}
              className="input input-bordered"
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
              className="input input-bordered"
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
              className="input input-bordered"
              placeholder="150.00"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Add Stock
          </button>
        </form>
      </div>

      <div className="p-6 max-w-md mx-auto bg-neutral rounded-xl shadow-md space-y-4 mt-8">
        <h1 className="text-2xl font-bold">Search Stocks</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Search for stocks</span>
            </label>
            <input
              type="text"
              value={searchStock}
              onChange={(e) => setSearchStock(e.target.value)}
              className="input input-bordered"
              placeholder="AAPL"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Search Stock
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            <ul className="list-disc ml-4">
              {searchResults.map((stock) => (
                <li key={stock.id}>
                  <strong>{stock.stockTicker}</strong>: {stock.amount} @ $
                  {stock.price} each, Total Value: $
                  {(stock.amount * stock.price).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default StocksPage;
