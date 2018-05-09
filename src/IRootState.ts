import { FormStateMap } from "redux-form";
import { IJobsState } from "./containers/Job/IJobsState";
import { IJobExecutionState } from "./containers/JobExecution/IJobExecutionsState";
import { IMenu } from "./containers/Layout/menu";
import { IJobStepExecutionState } from "./containers/JobStepExecution/IJobStepExecutionState";

export interface IRootState {
  layout: {
    menus: IMenu[];
    openViews: IMenu[];
    selectedMenuIndex: number;
    selectedMenuItem?: IMenu | null;
    selectedOpenedMenuIndex: number;
    selectedOpenedMenuItem?: IMenu | null;
    currentTheme: string;
    openSettingDrawer: boolean;
    showTabs: boolean;
    showOpenViews: boolean;
    isBoxedLayout: boolean;
  };
  route: any;
  form: FormStateMap;
  dashboard: any;
  auth: any;
  jobs: IJobsState;
  jobExecutions: IJobExecutionState;
  jobStepExecutions: IJobStepExecutionState;
}
