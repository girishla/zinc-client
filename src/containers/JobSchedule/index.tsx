import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { IJobSchedule } from "./IJobSchedule";
import JobSchedulesListView from "./jobScheduleListView";
import { jobScheduleActions } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { withRouter, RouteComponentProps } from "react-router";

interface IJobSchedulesProps extends RouteComponentProps<any> {
  jobSchedules: { data: IJobSchedule[] };
  jobSchedulesActions: typeof jobScheduleActions;
}

class ZincJobSchedules extends React.Component<IJobSchedulesProps> {
  public static defaultProps = {
    jobSchedules: {
      data: []
    }
  };

  public props: IJobSchedulesProps;

  constructor(props: IJobSchedulesProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.jobSchedulesActions.loadJobSchedules();
  }

  public render() {
    return (
      <JobSchedulesListView
        jobSchedules={this.props.jobSchedules && this.props.jobSchedules.data}
        jobSchedulesActions={this.props.jobSchedulesActions}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  jobSchedules: (store: IRootState) => store.jobSchedules
});

function mapDispatchToProps(dispatch: any) {
  return {
    jobSchedulesActions: bindActionCreators(jobScheduleActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "jobSchedules", reducer });
const withSaga = injectSaga({ key: "jobSchedules", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincJobSchedules);
