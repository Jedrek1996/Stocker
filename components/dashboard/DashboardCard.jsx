"use client";
import {
  getTotalAssets,
  getAllUserStockTickers,
  getAllStockQuotes,
  compareUserStock,
  getUserStocks,
} from "../../utils/action";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { AreaChartDiagram } from "./AreaChart";
import { DonutChartDisplay } from "./DonutChartDisplay";

const DashboardCard = ({ stockQuote }) => {
  const [totalAssets, setTotalAssets] = useState("");
  const { userId } = useAuth();

  const [userStocks, setUserStocks] = useState({});
  const [realTimeStocks, setRealTimeStocks] = useState({});
  const [comparisonResults, setComparisonResults] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total assets
        const data = await getTotalAssets(userId);
        console.log("Total Assets:", data);
        setTotalAssets(data);

        // Fetch stock tickers
        const stockTickers = await getAllUserStockTickers();

        // Fetch real-time stock quotes
        const realTimeData = await getAllStockQuotes(stockTickers);
        console.log("Actual Stocks 💹💹");
        console.log(realTimeData);
        setRealTimeStocks(realTimeData);

        // Fetch user stocks
        const userStockData = await getUserStocks(userId, stockTickers);
        console.log("User Stocks 🥲🥲");
        console.log(userStockData);
        setUserStocks(userStockData);

        // Compare stocks
        const results = await compareUserStock(userStockData, realTimeData);
        console.log("Comparison Results:", results);
        setComparisonResults(results);

        let totalProfitLoss = 0;
        results.forEach((result) => {
          const profitLoss =
            (result.userPrice - result.currentStockPrice) * result.amount;
          totalProfitLoss += profitLoss;
        });

        setTotalProfitLoss(totalProfitLoss);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const percentage =
    totalAssets === 0 ? 0 : (totalProfitLoss / totalAssets) * 100;
  console.log(percentage);
  return (
    <>
      <div className="flex gap-5">
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">Total Assets</h2>
            <h2>$ {totalAssets}</h2>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">
              {totalProfitLoss >= 0 ? "Net Profit 🟢" : "Net Loss 🔴"}
            </h2>
            <p>{totalProfitLoss.toFixed(2)}</p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">
              {totalProfitLoss >= 0 ? "Profit Percentage" : "Loss Percentage"}
            </h2>
            <p>{percentage.toFixed(2)}%</p>
          </div>
        </div>
        <DonutChartDisplay userStockData={userStocks} />
      </div>
      <AreaChartDiagram />
      <div>
        <h2>Stock Quote</h2>
        <p>
          <strong>Current Price:</strong> ${stockQuote.c}
        </p>
        <p>
          <strong>High Price of the Day:</strong> ${stockQuote.h}
        </p>
        <p>
          <strong>Low Price of the Day:</strong> ${stockQuote.l}
        </p>
        <p>
          <strong>Open Price of the Day:</strong> ${stockQuote.o}
        </p>
        <p>
          <strong>Previous Close Price:</strong> ${stockQuote.pc}
        </p>
      </div>
    </>
  );
};

export default DashboardCard;

// Need user to add their inputs in... store this data in BE
//Once done do the below...

////Total Assets, Loss Profit Percentage, NetIcome, Somerthing else

// Loss Profit Percentage

// Need to get the stock values of each of the user stocks
// - fetch the ACTUAL stock data based on the stock input by the user.
// - if there is such a stock comapre the price of the total amount with each other.
//
