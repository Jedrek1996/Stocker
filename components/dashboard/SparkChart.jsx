"use client";
import { Card, SparkAreaChart } from "@tremor/react";
import { fetchHistoricalDataPolygon } from "@/utils/polygonAction";
import { useEffect, useState } from "react";

export function SparkChart({ stockTicker }) {
  const [chartData, setChartData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchHistoricalDataPolygon(stockTicker);

        const latest = result.results[result.results.length - 1];
        const previous = result.results[0];

        const newPrice = latest.c;
        const oldPrice = previous.c;
        const change = ((newPrice - oldPrice) / oldPrice) * 100;

        setLatestPrice(newPrice);
        setPercentageChange(change.toFixed(2));

        const formattedData = result.results.map((item) => ({
          date: new Date(item.t).toLocaleDateString("en-US"),
          Performance: item.c,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchData();
  }, [stockTicker]);

  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5">
      <div className="flex items-center space-x-2.5">
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          {stockTicker}
        </p>
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {stockTicker} Inc.
        </span>
      </div>
      <SparkAreaChart
        data={chartData}
        categories={["Performance"]}
        index={"date"}
        colors={["emerald"]}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
      <div className="flex items-center space-x-2.5">
        <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {latestPrice}
        </span>
        <span
          className={`rounded px-2 py-1 text-tremor-default font-medium text-white ${
            percentageChange >= 0 ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {percentageChange}%
        </span>
      </div>
    </Card>
  );
}
