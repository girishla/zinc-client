export interface IInstanceId {
  identifying: boolean;
  value: string;
  type: string;
}

export interface IJobStartTime {
  identifying: boolean;
  value: Date;
  type: string;
}

export interface ITimestamp {
  identifying: boolean;
  value: any;
  type: string;
}

export interface IParameters {
  InstanceId: IInstanceId;
  jobStartTime: IJobStartTime;
  timestamp: ITimestamp;
}

export interface IJobParameters {
  parameters: IParameters;
  empty: boolean;
}

export interface IExitStatus {
  exitCode: string;
  exitDescription: string;
  running: boolean;
}

export interface ISelf {
  href: string;
}

export interface ILinks {
  self: ISelf;
}

// export interface IStepExecutionContext {}

export interface IStepExitStatus {
  exitCode: string;
  exitDescription: string;
  running: boolean;
}

export interface IStepLink {
  rel: string;
  href: string;
}

export interface IStepExecution {
  executionId: number;
  jobExecutionId: number;
  stepType?: any;
  stepName: string;
  status: string;
  readCount: number;
  writeCount: number;
  commitCount: number;
  rollbackCount: number;
  readSkipCount: number;
  processSkipCount: number;
  writeSkipCount: number;
  startTime: string;
  endTime: string;
  lastUpdated: Date;
  executionContext: {};
  exitStatus: IStepExitStatus;
  terminateOnly: boolean;
  filterCount: number;
  failureExceptions: any[];
  version: number;
  links: IStepLink[];
}

export interface IJobExecutionInfoResource {
  executionId: number;
  stepExecutionCount: number;
  jobId: number;
  version: number;
  startTime: any;
  endTime: any;
  createDate: Date;
  lastUpdated: Date;
  jobParameters: IJobParameters;
  restartable: boolean;
  abandonable: boolean;
  stoppable: boolean;
  timeZone: string;
  status: string;
  exitStatus: IExitStatus;
  jobConfigurationName?: any;
  failureExceptions: any[];
  executionContext: {};
  stepExecutions: IStepExecution[];
  name: string;
  _links: ILinks;
}

export interface IEmbedded {
  jobExecutionInfoResources: IJobExecutionInfoResource[];
}

export interface IPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface IJobExecutionCollection {
  _embedded: IEmbedded;
  page: IPage;
}
