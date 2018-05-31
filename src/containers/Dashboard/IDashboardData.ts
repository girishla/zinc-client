export interface ISelf {
  href: string;
}

export interface ILinks {
  self: ISelf;
  zincMetric: ISelf;
}

export interface IZincmetric {
  metricTime: any;
  metricDate: number;
  metricType: string;
  metricName: string;
  dimensionOne: string;
  dimensionTwo: string;
  dimensionThree?: any;
  metricValue: number;
  _links: ILinks;
}

export interface IEmbedded {
  zincmetrics: IZincmetric[];
}

export interface ISelf2 {
  href: string;
}

export interface ILinks2 {
  self: ISelf2;
}

export interface IMetricCollection {
  _embedded: IEmbedded;
  _links: ILinks2;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IBarChartData {
  name: string;
  bars: IPoint[];
  tickValues: string[];
}

export interface ILineChartData {
  name: string;
  points: IPoint[];
  tickValues: string[];
}

export interface IDashboardData {
  apiMetrics: IMetricCollection;
  executionMetrics: IMetricCollection;
  tableCountMetrics: IMetricCollection;
  tableChangesMetrics: IMetricCollection;
  perfTilesData: any;
  executionCountBarChartData: IBarChartData[];
  tableCountBarChartData: IBarChartData[];
  tableChangesLineChartData: ILineChartData[];
}
