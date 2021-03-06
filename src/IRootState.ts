import { FormStateMap } from "redux-form";
import { IJobsState } from "./containers/Job/IJobsState";
import { IJobExecutionState } from "./containers/JobExecution/IJobExecutionsState";
import { IMenu } from "./containers/Layout/menu";
import { IJobStepExecutionState } from "./containers/JobStepExecution/IJobStepExecutionState";
import { IJobScheduleState } from "./containers/JobSchedule/IJobScheduleState";
import { IJobScheduleDetailState } from "./containers/JobScheduleDetail/IJobScheduleDetailState";
import { ISalesforceObjectState } from "./containers/SetupSalesforceObject/ISalesforceObjectState";
import { IUserState } from "src/containers/SetupUsers/IUserState";

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
    snackBarOpen: boolean;
    snackBarMessage: string;
    alertMessageOpen: boolean;
    alertMessage: string;
    alertMessageTitle: string;
    alertSeverity: string;
    isModalOpen: boolean;
    onModalOk: () => void;
    onModalCancel: () => void;
    okActionName: string;
    modalTitle: string;
    modalContent: (contentProps: any) => JSX.Element[] | JSX.Element;
    modalData: any;
    modalSelections: any;
  };
  route: any;
  form: FormStateMap;
  dashboard: any;
  auth: any;
  jobs: IJobsState;
  jobExecutions: IJobExecutionState;
  jobStepExecutions: IJobStepExecutionState;
  jobSchedules: IJobScheduleState;
  jobScheduleDetail: IJobScheduleDetailState;
  salesforceObjects: ISalesforceObjectState;
  users: IUserState;
}
