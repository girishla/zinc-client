import { chain } from "lodash";
import { IZincmetric, IDashboardData } from "../IDashboardData";

export default function getPerfTiles(dashboardData: IDashboardData) {
  const metrics: IZincmetric[] = dashboardData.apiMetrics._embedded.zincmetrics;

  return chain(metrics)
    .keyBy("metricName")
    .mapValues("metricValue")
    .value();
}
