import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "7/Aug/22",
    TotalAssets: 2890,
  },
  {
    date: "8/Aug/22",
    TotalAssets: 2756,
  },
  {
    date: "9/Aug/22",
    TotalAssets: 3322,
  },
  {
    date: "10/Aug/22",
    TotalAssets: 3470,
  },
  {
    date: "11/Aug/22",
    TotalAssets: 3475,
  },
  {
    date: "12/Aug/22",
    TotalAssets: 3129,
  },
  {
    date: "13/Aug/22",
    TotalAssets: 3490,
  },
];

const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export function AreaChartDiagram() {
  return (
    <AreaChart
      className="h-80"
      data={chartdata}
      index="date"
      categories={["TotalAssets"]}
      colors={["indigo"]}
      valueFormatter={dataFormatter}
      onValueChange={(v) => console.log(v)}
    />
  );
}

//Total assets, need to retrieve the value by the end of the day. Store it in the database
// if new assets is added to that day the chart will change
