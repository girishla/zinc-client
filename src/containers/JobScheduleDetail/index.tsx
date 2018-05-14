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
import { withRouter, RouteComponentProps } from "react-router";
import styles from "./styles";
import Theme from "../../theming/theme";

interface IJobScheduleDetailProps extends RouteComponentProps<any> {
  jobScheduleDetail: { data: IJobSchedule };
  jobScheduleDetailActions: typeof jobScheduleDetailActions;
  currentTheme: any;
}

const theme = new Theme();
class ZincJobScheduleDetail extends React.Component<IJobScheduleDetailProps> {
  public static defaultProps = {
    jobScheduleDetail: {
      data: []
    }
  };
  public state: any;
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
    if (
      this.props.match.params &&
      this.props.match.params.scheduleName &&
      this.props.match.params.scheduleName !== "new"
    ) {
      this.props.jobScheduleDetailActions.loadJobScheduleDetail(
        this.props.match.params.scheduleName
      );
    }
  }

  public onJobDetailSave = (values: any) => {
    this.props.jobScheduleDetailActions.saveJobScheduleDetail(values);
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
          {/* <pre>{JSON.stringify(this.state.currentTheme, null, 2)}</pre> */}
          <JobScheduleDetailView
            onSubmit={this.onJobDetailSave}
            styles={currentStyles}
            mode={
              this.props.match.params.scheduleName === "new" ? "new" : "edit"
            }
            initialValues={{
              jobName,
              scheduleName,
              active,
              cronExpression
            }}
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
  currentTheme: (store: IRootState) => store.layout.currentTheme
});

function mapDispatchToProps(dispatch: any) {
  return {
    jobScheduleDetailActions: bindActionCreators(
      jobScheduleDetailActions,
      dispatch
    )
  };
}

const withReducer = injectReducer({ key: "jobScheduleDetail", reducer });
const withSaga = injectSaga({ key: "jobScheduleDetail", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincJobScheduleDetail);
