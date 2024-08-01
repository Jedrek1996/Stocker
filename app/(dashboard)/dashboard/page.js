"use client";
import StockQuote from "@/components/dashboard/StockQuote";

const Page = () => {
  return (
    <div>
      <h1>Stock Quote Dashboard</h1>
      <StockQuote stockSymbol="AAPL" />
    </div>
  );
};

export default Page;
