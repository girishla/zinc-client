import * as React from "react";

import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import { jobsActions } from "./actions";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";

import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import JobsListView from "./JobsListView";
import { IJobCollection } from "./IJobCollection";

interface IJobsProps {
  jobs: { data: IJobCollection };
  jobsActions: typeof jobsActions;
  loading: boolean;
}

class ZincJobs extends React.Component<IJobsProps> {
  public props: IJobsProps;

  constructor(props: IJobsProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.jobsActions.loadJobs();
  }

  public render() {
    return (
      <JobsListView
        jobsActions={this.props.jobsActions}
        loading={this.props.loading}
        jobs={
          this.props.jobs &&
          this.props.jobs.data &&
          this.props.jobs.data._embedded &&
          this.props.jobs.data._embedded.detailedJobInfoResources
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  jobs: (store: IRootState) => store.jobs,
  loading: (store: IRootState) => store.jobs && store.jobs.loading
});

function mapDispatchToProps(dispatch: any) {
  return {
    jobsActions: bindActionCreators(jobsActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "jobs", reducer });
const withSaga = injectSaga({ key: "jobs", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincJobs);
