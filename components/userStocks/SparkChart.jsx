"use client";
import { Card, SparkAreaChart } from "@tremor/react";
import { fetchHistoricalStockData } from "../../utils/action";
import { useEffect } from "react";
const chartdata = [
  {
    month: "Jan 21",
    Performance: 4000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
  },
];

export function SparkChart() {
  useEffect(() => {
    const getStockData = async () => {
      const { result } = await fetchHistoricalStockData(
        "AAPL",
        "2024-08-05",
        "2024-08-07"
      );
      if (result && result.c) {
        // 'c' contains the close prices
        const formattedData = result.c.map((price, index) => ({
          month: new Date(result.t[index] * 1000).toLocaleDateString("en-GB"), // Format date
          Performance: price,
        }));
        // setChartData(formattedData);
        console.log(formattedData);
      }
    };
    getStockData();
  }, []);
  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5">
      <div className="flex items-center space-x-2.5">
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          APPL
        </p>
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Apple Inc.
        </span>
      </div>
      <SparkAreaChart
        data={chartdata}
        categories={["Performance"]}
        index={"month"}
        colors={["emerald"]}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
      <div className="flex items-center space-x-2.5">
        <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          179.26 Current Value
        </span>
        <span className="rounded bg-emerald-500 px-2 py-1 text-tremor-default font-medium text-white">
          +1.72%
        </span>
      </div>
    </Card>
  );
}
