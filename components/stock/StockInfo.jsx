import React from "react";

const StockInfo = ({ stockData }) => {
  if (!stockData) {
    return <div>No data available</div>;
  }

  const { stock, country, title, description } = stockData;

  return (
    <div>
      <h2>{title}</h2>
      <p>
        <strong>Stock:</strong> {stock}
      </p>
      <p>
        <strong>Country:</strong> {country}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

export default StockInfo;
