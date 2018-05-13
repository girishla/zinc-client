export interface ILink {
  rel: string;
  href: string;
}

export interface IJobSchedule {
  jobName: string;
  scheduleName: string;
  active: boolean;
  cronExpression: string;
  nextFireTime: string;
  cronDescription: string;
  links: ILink[];
}
