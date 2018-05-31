import {
  IDashboardData,
  IZincmetric,
  IBarChartData,
  IPoint
} from "../IDashboardData";
import { orderBy } from "lodash";

export default function getTableCountsBarChartData(
  dashboardData: IDashboardData
) {
  const metrics: IZincmetric[] =
    dashboardData.tableCountMetrics._embedded.zincmetrics;

  const tableCountsBarChartData: IBarChartData[] = [];

  // const totalCountMetrics: IZincmetric[] = metrics.filter(metric =>
  //   metric.dimensionOne.startsWith("Total")
  // );

  // tableCountsBarChartData.push(
  //   getTableCountMetricsAsBarData("All Tables", totalCountMetrics)
  // );

  let tableLevelCountMetrics: IZincmetric[] = metrics.filter(
    metric => !metric.dimensionOne.startsWith("Total")
  );

  // sort the array by valueand keep only top 25
  tableLevelCountMetrics = orderBy(
    tableLevelCountMetrics,
    ["metricValue"],
    ["desc"]
  ).slice(0, 20);

  tableCountsBarChartData.push(
    getTableCountMetricsAsBarData(
      "Table Counts(Top 20)",
      tableLevelCountMetrics
    )
  );

  return tableCountsBarChartData;
}

function getTableCountMetricsAsBarData(name: string, metrics: IZincmetric[]) {
  const bars: IPoint[] = [];
  const tickValues: string[] = [];

  for (const metric of metrics) {
    const point: IPoint = {
      x: bars.length + 1,
      y: metric.metricValue
    };
    bars.push(point);
    tickValues.push(metric.dimensionOne);
  }

  return { name, bars, tickValues };
}
