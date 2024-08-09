"use client";
import {
  getTotalAssets,
  getAllUserStockTickers,
  getAllStockQuotes,
  compareUserStock,
  getUserStocks,
} from "@/utils/action";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { AreaChartDiagram } from "./AreaChart";
import { DonutChartDisplay } from "./DonutChartDisplay";
import { SparkChart } from "./SparkChart";

const DashboardCard = () => {
  const [totalAssets, setTotalAssets] = useState("");
  const { userId } = useAuth();

  const [userStocks, setUserStocks] = useState({});
  const [stockTickers, setStockTickers] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total assets
        const data = await getTotalAssets(userId);
        setTotalAssets(data);

        // Fetch stock tickers
        const userStockTickers = await getAllUserStockTickers();
        setStockTickers(userStockTickers);
        console.log("User STOCK TICKERS" + userStockTickers);

        // Fetch real-time stock quotes
        const realTimeData = await getAllStockQuotes(userStockTickers);
        // console.log("Actual Stocks 💹💹" + JSON.stringify(realTimeData));

        // Fetch user stocks
        const userStockData = await getUserStocks(userId, userStockTickers);
        setUserStocks(userStockData);
        // console.log("User Stocks 🥲🥲" + userStockData);

        // Compare stocks
        const results = await compareUserStock(userStockData, realTimeData);

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
  }, []);

  const percentage =
    totalAssets === 0 ? 0 : (totalProfitLoss / totalAssets) * 100;
  return (
    <>
      <div className="flex flex-col gap-4">
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
        <div className="grid grid-cols-2 gap-4">
          {stockTickers.map((ticker) => (
            <SparkChart key={ticker} stockTicker={ticker} />
          ))}
        </div>
        <AreaChartDiagram />
      </div>
    </>
  );
};

export default DashboardCard;
