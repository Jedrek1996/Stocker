import StockCard from "./stockCard";
const StocksList = ({ data }) => {
  if (data.length === 0) return <h4 className="text-lg ">No tours found...</h4>;

  return (
    <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-8">
      {data.map((stock) => {
        return <StockCard key={stock.id} stockData={stock} />;
      })}
    </div>
  );
};
export default StocksList;
