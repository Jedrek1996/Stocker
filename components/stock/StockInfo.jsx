const StockInfo = ({ stockData }) => {
  if (!stockData) {
    return <div>No data available</div>;
  }

  const { stock, country, title, description } = stockData;

  return (
    <div className="max-w-2xl pl-4">
      <h3 className="text-4xl font-semibold mb-4">{title}</h3>
      <p className="leading-loose mb-4">Country: {country}</p>
      <p className="leading-loose mb-4">Stock: {stock}</p>
      <p className="leading-loose">Description: {description}</p>
    </div>
  );
};

export default StockInfo;
