import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { IStepExecution } from "../JobExecution/IJobExecutionCollection";
import JobStepExecutionsListView from "./jobStepExecutionsListView";
import { jobExecutionActions } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { withRouter, RouteComponentProps } from "react-router";

interface IJobStepExecutionsProps extends RouteComponentProps<any> {
  jobStepExecutions: { data: IStepExecution[] };
  jobStepExecutionsActions: typeof jobExecutionActions;
}

class ZincJobStepExecutions extends React.Component<IJobStepExecutionsProps> {
  public static defaultProps = {
    jobStepExecutions: {
      data: []
    }
  };

  public props: IJobStepExecutionsProps;

  constructor(props: IJobStepExecutionsProps) {
    super(props);
  }

  public componentDidMount() {
    console.log("this.props", this.props);

    if (this.props.match.params && this.props.match.params.executionId) {
      this.props.jobStepExecutionsActions.loadJobStepExecutions(
        this.props.match.params.executionId
      );
    }
  }

  public render() {
    return (
      <JobStepExecutionsListView
        jobStepExecutions={
          this.props.jobStepExecutions && this.props.jobStepExecutions.data
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  jobStepExecutions: (store: IRootState) => store.jobStepExecutions
});

function mapDispatchToProps(dispatch: any) {
  return {
    jobStepExecutionsActions: bindActionCreators(jobExecutionActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "jobStepExecutions", reducer });
const withSaga = injectSaga({ key: "jobStepExecutions", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincJobStepExecutions);
