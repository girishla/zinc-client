import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { IJobSchedule } from "../JobSchedule/IJobSchedule";
import JobScheduleDetailView from "./jobScheduleDetailView";
import { jobScheduleDetailActions } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import jobsReducer from "../Job/reducer";
import jobsSaga from "../Job/saga";
import { withRouter, RouteComponentProps } from "react-router";
import styles from "./styles";
import Theme, { ITheme } from "../../theming/theme";
import {
  IJobCollection,
  IDetailedJobInfoResource
} from "../Job/IJobCollection";
import { jobsActions } from "../Job/actions";
import { get as deepGet } from "lodash";
import Snackbar from "material-ui/Snackbar";

interface IJobScheduleDetailProps extends RouteComponentProps<any> {
  jobScheduleDetail: { data: IJobSchedule };
  jobsList: { data: IJobCollection };
  jobScheduleDetailActions: typeof jobScheduleDetailActions;
  jobsActions: typeof jobsActions;
  currentTheme: any;
  dispatch: any;
  snackBarOpen: boolean;
  snackBarMessage: string;
}

interface IJobDetailState {
  currentTheme: ITheme;
}

const theme = new Theme();
class ZincJobScheduleDetail extends React.Component<IJobScheduleDetailProps> {
  public static defaultProps = {
    jobScheduleDetail: {
      data: []
    }
  };
  public state: IJobDetailState;
  public props: IJobScheduleDetailProps;

  constructor(props: IJobScheduleDetailProps) {
    super(props);

    this.state = {
      currentTheme: theme.get(props.currentTheme)
    };
  }

  public componentWillReceiveProps(newProps: IJobScheduleDetailProps) {
    if (newProps.currentTheme !== this.props.currentTheme) {
      this.setState({
        currentTheme: theme.get(newProps.currentTheme)
      });
    }
  }

  public componentDidMount() {
    if (this.props.match.params && this.props.match.params.scheduleName) {
      if (this.props.match.params.scheduleName !== "new") {
        this.props.jobScheduleDetailActions.loadJobScheduleDetail(
          this.props.match.params.scheduleName
        );
      }
      this.props.jobsActions.loadJobs();
    }
  }

  public getJobNames() {
    const jobInfoArray: IDetailedJobInfoResource[] = deepGet(
      this.props,
      "jobsList.data._embedded.detailedJobInfoResources"
    );
    if (jobInfoArray) {
      return jobInfoArray.map(
        (jobInfo: IDetailedJobInfoResource) => jobInfo.name
      );
    } else {
      return [];
    }
  }

  public handleSnackBarClose = () => {
    console.log("calling close");
  };

  public onJobDetailSave = (values: any) => {
    this.props.jobScheduleDetailActions.saveJobScheduleDetail(values);
    this.props.history.push("/schedule/" + values.scheduleName);
  };

  public render() {
    const currentStyles = styles(this.state.currentTheme);

    if (
      (this.props.jobScheduleDetail &&
        this.props.jobScheduleDetail.data &&
        this.props.jobScheduleDetail.data.scheduleName) ||
      this.props.match.params.scheduleName === "new"
    ) {
      const {
        jobName,
        scheduleName,
        active,
        cronExpression
      } = this.props.jobScheduleDetail.data;

      return (
        <div>
          {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
          <JobScheduleDetailView
            onSubmit={this.onJobDetailSave}
            styles={currentStyles}
            mode={
              this.props.match.params.scheduleName === "new" ? "new" : "edit"
            }
            jobNames={this.getJobNames()}
            initialValues={
              this.props.match.params.scheduleName === "new"
                ? {
                    jobName: "",
                    scheduleName: "",
                    active: true,
                    cronExpression: "*/15 * * * *"
                  }
                : {
                    jobName,
                    scheduleName,
                    active,
                    cronExpression: cronExpression || "*/15 * * * *"
                  }
            }
          />
          <Snackbar
            open={this.props.snackBarOpen || false}
            message={this.props.snackBarMessage || ""}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackBarClose}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  jobScheduleDetail: (store: IRootState) => store.jobScheduleDetail,
  currentTheme: (store: IRootState) => store.layout.currentTheme,
  jobsList: (store: IRootState) => store.jobs,
  snackBarOpen: (store: IRootState) =>
    store.jobScheduleDetail && store.jobScheduleDetail.snackBarOpen,
  snackBarMessage: (store: IRootState) =>
    store.jobScheduleDetail && store.jobScheduleDetail.snackBarMessage
});

function mapDispatchToProps(dispatch: any) {
  return {
    jobScheduleDetailActions: bindActionCreators(
      jobScheduleDetailActions,
      dispatch
    ),
    jobsActions: bindActionCreators(jobsActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "jobScheduleDetail", reducer });
const withSaga = injectSaga({ key: "jobScheduleDetail", saga });

const withJobsReducer = injectReducer({ key: "jobs", reducer: jobsReducer });
const withJobsSaga = injectSaga({ key: "jobs", saga: jobsSaga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  withJobsReducer,
  withJobsSaga,
  userIsNotAuthenticatedRedir
)(ZincJobScheduleDetail);
