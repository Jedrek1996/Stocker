import Link from "next/link";
const StockCard = ({ stockData }) => {
  const { stock, country, title, description, id } = stockData;

  return (
    <Link
      href={`/stockerai/${id}`}
      className="card card-compact rounded-xl bg-base-100"
    >
      <div className="card-body items-center text-center">
        <h1>{title}</h1>
        <h2 className="card-title text-center">
          {stock}, {country}
        </h2>
      </div>
    </Link>
  );
};
export default StockCard;
