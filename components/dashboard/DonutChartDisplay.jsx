import { DonutChart, Legend } from "@tremor/react";

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export function DonutChartDisplay({ userStockData }) {
  const transformedData = Object.values(userStockData).map((stock) => ({
    name: stock.stockTicker,
    value: stock.totalValue,
  }));
  console.log(transformedData);

  return (
    <>
      <div className="flex items-center justify-center space-x-6 flex-col">
        <DonutChart
          data={transformedData}
          category="value"
          index="name"
          valueFormatter={valueFormatter}
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="w-40"
        />
        <Legend
          categories={transformedData.map((stock) => stock.name)}
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="max-w-xs"
        />
      </div>
    </>
  );
}
