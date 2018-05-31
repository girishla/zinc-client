import {
  IDashboardData,
  IZincmetric,
  ILineChartData,
  IPoint
} from "../IDashboardData";

export default function getTableChangesLineChartData(
  dashboardData: IDashboardData
) {
  const metrics: IZincmetric[] =
    dashboardData.tableCountMetrics._embedded.zincmetrics;

  const tableChangesLineChartData: ILineChartData[] = [];

  // find metrics where dim2 is unspecified

  const totalCountMetrics: IZincmetric[] = metrics.filter(metric =>
    metric.dimensionOne.startsWith("Total")
  );

  tableChangesLineChartData.push(
    getTableCountMetricsAsLineData("All Tables", totalCountMetrics)
  );

  const tableLevelCountMetrics: IZincmetric[] = metrics.filter(
    metric => !metric.dimensionOne.startsWith("Total")
  );

  tableChangesLineChartData.push(
    getTableCountMetricsAsLineData("Table Changes", tableLevelCountMetrics)
  );

  return tableChangesLineChartData;
}

function getTableCountMetricsAsLineData(name: string, metrics: IZincmetric[]) {
  const points: IPoint[] = [];
  const tickValues: string[] = [];

  for (const metric of metrics) {
    const point: IPoint = {
      x: points.length + 1,
      y: metric.metricValue
    };
    points.push(point);
    tickValues.push(metric.dimensionOne);
  }

  return { name, points, tickValues };
}
