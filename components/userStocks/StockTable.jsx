import React from "react";

const StockTable = ({ allStocks }) => {
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
          </tr>
        </thead>
        <tbody>
          {allStocks && allStocks.length > 0 ? (
            allStocks.map((stock, index) => (
              <tr key={stock.id}>
                <th>{index + 1}</th>
                <td>{stock.stockTicker}</td>
                <td>{stock.amount}</td>
                <td>{stock.price}</td>
                <td>{stock.totalValue}</td>
                <td>{new Date(stock.createdAt).toLocaleString()}</td>
                <td>{new Date(stock.updatedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
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
