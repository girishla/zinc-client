import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { IJobExecutionCollection } from "./IJobExecutionCollection";
import JobExecutionsListView from "./jobExecutionsListView";
import { jobExecutionActions } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { withRouter, RouteComponentProps } from "react-router";

interface IJobExecutionsProps extends RouteComponentProps<any> {
  jobExecutions: { data: IJobExecutionCollection };
  jobExecutionsActions: typeof jobExecutionActions;
  loading: boolean;
}

class ZincJobExecutions extends React.Component<IJobExecutionsProps> {
  public static defaultProps = {
    jobExecutions: {
      data: { _embedded: {} }
    }
  };

  public props: IJobExecutionsProps;

  constructor(props: IJobExecutionsProps) {
    super(props);
  }

  public componentDidMount() {
    if (
      this.props.match.params &&
      this.props.match.params.jobInstanceId &&
      this.props.match.params.jobName
    ) {
      this.props.jobExecutionsActions.loadJobInstanceExecutions(
        this.props.match.params.jobName,
        this.props.match.params.jobInstanceId
      );
    } else if (this.props.match.params && this.props.match.params.jobName) {
      this.props.jobExecutionsActions.loadJobExecutions(
        this.props.match.params.jobName
      );
    } else {
      this.props.jobExecutionsActions.loadExecutions();
    }
  }

  public render() {
    return (
      <JobExecutionsListView
        loading={this.props.loading}
        jobExecutions={
          this.props.jobExecutions &&
          this.props.jobExecutions.data &&
          this.props.jobExecutions.data._embedded &&
          this.props.jobExecutions.data._embedded.jobExecutionInfoResources
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  jobExecutions: (store: IRootState) => store.jobExecutions,
  loading: (store: IRootState) =>
    store.jobExecutions && store.jobExecutions.loading
});

function mapDispatchToProps(dispatch: any) {
  return {
    jobExecutionsActions: bindActionCreators(jobExecutionActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "jobExecutions", reducer });
const withSaga = injectSaga({ key: "jobExecutions", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincJobExecutions);
