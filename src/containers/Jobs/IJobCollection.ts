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
    value: number;
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

export interface IDetailedJobInfoResource {
    name: string;
    executionCount: number;
    launchable: boolean;
    incrementable: boolean;
    jobInstanceId: number;
    jobParameters: IJobParameters;
    startTime: Date;
    endTime: string;
    stepExecutionCount: number;
    exitStatus: IExitStatus;
    _links: ILinks;
}

export interface IEmbedded {
    detailedJobInfoResources: IDetailedJobInfoResource[];
}

export interface IJobCollectionSelf {
    href: string;
}

export interface IJobCollectionLinks {
    self: IJobCollectionSelf;
}

export interface IPage {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface IJobCollection {
    _embedded: IEmbedded;
    _links: IJobCollectionLinks;
    page: IPage;
}


