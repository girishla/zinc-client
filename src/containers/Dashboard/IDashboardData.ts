export interface ISelf {
  href: string;
}

export interface IZincMetric {
  href: string;
}

export interface ILinks {
  self: ISelf;
  zincMetric: IZincMetric;
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

export interface IDashboardData {
  apiMetrics: IMetricCollection;
  executionMetrics: IMetricCollection;
}
