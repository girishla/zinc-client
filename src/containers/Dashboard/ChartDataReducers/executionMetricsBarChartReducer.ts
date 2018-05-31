import {
  IDashboardData,
  IZincmetric,
  IBarChartData,
  IPoint
} from "../IDashboardData";
import { orderBy } from "lodash";

export default function getExecutionMetricsBarChartData(
  dashboardData: IDashboardData,
  metricName: string
) {
  const metrics: IZincmetric[] =
    dashboardData.executionMetrics._embedded.zincmetrics;

  const executionCountBarChartData: IBarChartData[] = [];

  // find metrics where dim2 is unspecified

  let jobLevelExecutionMetrics: IZincmetric[] = metrics.filter(
    metric =>
      metric.dimensionTwo === "Unspecified" &&
      metric.metricName.indexOf(metricName) > 0
  );

  jobLevelExecutionMetrics = orderBy(
    jobLevelExecutionMetrics,
    ["metricValue"],
    ["desc"]
  );

  executionCountBarChartData.push(
    getExecutionMetricsAsBarData(
      "All Jobs " + "(" + metricName + ")",
      jobLevelExecutionMetrics
    )
  );

  for (const jobLevelMetric of jobLevelExecutionMetrics) {
    let stepLevelExecutionMetrics: IZincmetric[] = metrics.filter(
      metric =>
        metric.metricName.indexOf(metricName) > 0 &&
        metric.dimensionOne === jobLevelMetric.dimensionOne &&
        metric.dimensionTwo !== "Unspecified"
    );

    // remove master steps
    stepLevelExecutionMetrics = stepLevelExecutionMetrics.filter(
      metric => !metric.dimensionTwo.includes("MasterStep")
    );

    stepLevelExecutionMetrics = orderBy(
      stepLevelExecutionMetrics,
      ["metricValue"],
      ["desc"]
    );

    executionCountBarChartData.push(
      getExecutionMetricsAsBarData(
        jobLevelMetric.dimensionOne + " steps " + "(" + metricName + ")",
        stepLevelExecutionMetrics
      )
    );
  }

  return executionCountBarChartData;
}

function getExecutionMetricsAsBarData(name: string, metrics: IZincmetric[]) {
  const bars: IPoint[] = [];
  const tickValues: string[] = [];

  for (const metric of metrics) {
    const bar: IPoint = {
      x: bars.length + 1,
      y: metric.metricValue
    };
    bars.push(bar);
    if (metric.dimensionTwo === "Unspecified") {
      tickValues.push(metric.dimensionOne);
    } else {
      tickValues.push(getFormattedTickValue(metric.dimensionTwo));
    }
  }

  // bars = orderBy(bars, ["y"], ["desc"]);

  return { name, bars, tickValues };
}

function getFormattedTickValue(value: string) {
  // remove job prefix
  value = value.substr(value.indexOf("~~") + 2);
  value = value.replace("IncrementalSoqlPull::", "(Incr)");
  value = value.replace("HardDelete:", "(Delete)");
  value = value.replace("Full:NonChunked::", "(Full)");
  value = value.replace("Full:PKChunked:", "(Full)");
  value = value.replace("Full:BulkUnsupported::", "(Full)");
  value = value.replace("Incr:Repl::", "(Incr)");
  return value;
}
