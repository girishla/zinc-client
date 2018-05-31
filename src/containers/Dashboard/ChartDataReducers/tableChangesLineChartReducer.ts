import {
  IDashboardData,
  IZincmetric,
  ILineChartData,
  IPoint
} from "../IDashboardData";
import { orderBy } from "lodash";

export default function getTableChangesLineChartData(
  dashboardData: IDashboardData
) {
  const metrics: IZincmetric[] =
    dashboardData.tableChangesMetrics._embedded.zincmetrics;

  let tableChangesLineChartData: ILineChartData[] = [];

  let totalCountMetrics: IZincmetric[] = metrics.filter(
    metric =>
      metric.dimensionOne.startsWith("Total") &&
      metric.metricName === "Record Created Count"
  );

  totalCountMetrics = orderBy(totalCountMetrics, ["metricDate"], ["asc"]);

  tableChangesLineChartData.push(
    getTableCountMetricsAsLineData(
      "30 Days Records Created: all tables",
      totalCountMetrics
    )
  );

  totalCountMetrics = metrics.filter(
    metric =>
      metric.dimensionOne.startsWith("Total") &&
      metric.metricName === "Record Updated Count"
  );

  totalCountMetrics = orderBy(totalCountMetrics, ["metricDate"], ["asc"]);

  tableChangesLineChartData.push(
    getTableCountMetricsAsLineData(
      "30 Days Records Updated: all tables",
      totalCountMetrics
    )
  );

  let tableLevelCountMetrics: IZincmetric[] = metrics.filter(
    metric =>
      !metric.dimensionOne.startsWith("Total") &&
      metric.metricName === "Record Created Count"
  );

  tableChangesLineChartData = tableChangesLineChartData.concat(
    getChartMetricsForTables(tableLevelCountMetrics, "Records Created")
  );

  tableLevelCountMetrics = metrics.filter(
    metric =>
      !metric.dimensionOne.startsWith("Total") &&
      metric.metricName === "Record Updated Count"
  );

  tableChangesLineChartData = tableChangesLineChartData.concat(
    getChartMetricsForTables(tableLevelCountMetrics, "Records Updated")
  );

  tableChangesLineChartData = orderBy(
    tableChangesLineChartData,
    ["name"],
    ["asc"]
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
    tickValues.push(metric.metricDate.toString());
  }

  return { name, points, tickValues };
}

function getChartMetricsForTables(metrics: IZincmetric[], nameSuffix: string) {
  const lineChartData: ILineChartData[] = [];

  metrics = orderBy(metrics, ["metricDate"], ["asc"]);

  const metricMap: Map<string, IZincmetric[]> = metrics.reduce(
    (map, obj: IZincmetric) => {
      if (!map.get(obj.dimensionOne)) {
        map.set(obj.dimensionOne, []);
      }
      map.get(obj.dimensionOne).push(obj);
      return map;
    },
    new Map()
  );

  metricMap.forEach(
    (value: IZincmetric[], key: string, map: Map<string, IZincmetric[]>) => {
      lineChartData.push(
        getTableCountMetricsAsLineData(
          "30 Days " + nameSuffix + ": " + key,
          value || []
        )
      );
    }
  );

  console.log(lineChartData);

  return lineChartData;
}
