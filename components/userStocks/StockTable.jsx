"use client";
import { deleteUserStock } from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const StockTable = ({ allStocks }) => {
  const { userId } = useAuth();
  const [allUserStocks, setAllUserStocks] = useState([]);

  useEffect(() => {
    setAllUserStocks(allStocks);
  }, [allStocks]);

  const handleDeleteStock = async (userId, stockId) => {
    try {
      await deleteUserStock(userId, stockId);
      setAllUserStocks(allUserStocks.filter((stock) => stock.id !== stockId));
    } catch (error) {
      console.error("Failed to delete stock:", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-10">
      <div>Your Stocks</div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Stock Ticker</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Total Value</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUserStocks && allUserStocks.length > 0 ? (
            allUserStocks.map((stock, index) => (
              <tr key={stock.id}>
                <th>{index + 1}</th>
                <td>{stock.stockTicker}</td>
                <td>{stock.amount}</td>
                <td>{stock.price}</td>
                <td>{stock.totalValue}</td>
                <td>{new Date(stock.createdAt).toLocaleString()}</td>
                <td>{new Date(stock.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="text-red-400"
                    onClick={() => handleDeleteStock(userId, stock.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No stocks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
