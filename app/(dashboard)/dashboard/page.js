"use client";
import StockQuote from "@/components/dashboard/StockQuote";

const Page = () => {
  return (
    <div>
      <StockQuote stockSymbol="AAPL" />
    </div>
  );
};

export default Page;
