"use client";
import { useState, useEffect } from "react";
import { AreaChart } from "@tremor/react";
import { fetchHistoricalDataPolygon } from "@/utils/polygonAction";

const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export function AreaChartDiagram() {
  const [areaChartData, setAreaChartData] = useState([]);

  useEffect(() => {
    fetchHistoricalDataPolygon("TSLA")
      .then((data) => {
        const formattedData = data.results.map((item) => ({
          date: new Date(item.t).toLocaleDateString("en-US"),
          TotalAssets: item.c,
        }));

        setAreaChartData(formattedData);
      })
      .catch((error) =>
        console.error("Error fetching historical data:", error)
      );
  }, []);

  return (
    <AreaChart
      className="h-80"
      data={areaChartData}
      index="date"
      categories={["TotalAssets"]}
      colors={["indigo"]}
      valueFormatter={dataFormatter}
      onValueChange={(v) => console.log(v)}
    />
  );
}