import * as React from "react";

import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { dashboardActions } from "./actions";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { withRouter } from "react-router";
import DashboardInfoBox from "src/components/DashboardInfoBox";
import { cyan500, white } from "material-ui/styles/colors";

import Dimensions from "react-dimensions";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import { IDashboardState } from "./IDashboardState";
import { get as deepGet } from "lodash";
import BarChartGrid from "./BarChartGrid";
// import LineChartGrid from "./LineChartGrid";

interface IDashboardProps {
  dashboardState: IDashboardState;
  auth?: any;
  actions: typeof dashboardActions;
  containerWidth: number;
}

export class Dashboard extends React.Component<IDashboardProps> {
  constructor(props: IDashboardProps) {
    super(props);
  }

  public componentDidMount() {
    // 7 days
    this.props.actions.loadDashboard(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    );
  }

  public componentWillReceiveProps() {}

  public render() {
    const executionCountBarChartData = deepGet(
      this.props,
      "dashboardState.data.executionCountBarChartData"
    );

    const tableCountBarChartData = deepGet(
      this.props,
      "dashboardState.data.tableCountBarChartData"
    );

    return (
      <div>
        <div className="row">
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={white}
              iconColor={cyan500}
              title="SOAP API USAGE"
              value={deepGet(
                this.props,
                "dashboardState.data.perfTilesData.SFDC_SOAP_API_CALLS"
              )}
            />
          </div>
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={white}
              iconColor={cyan500}
              title="BULK API USAGE"
              value={deepGet(
                this.props,
                "dashboardState.data.perfTilesData.SFDC_BULK_API_CALLS"
              )}
            />
          </div>
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={white}
              iconColor={cyan500}
              title="REPLICATION API USAGE"
              value={deepGet(
                this.props,
                "dashboardState.data.perfTilesData.SFDC_REPL_API_CALLS"
              )}
            />
          </div>
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={white}
              iconColor={cyan500}
              title="CONNECTION ERRORS"
              value={deepGet(
                this.props,
                "dashboardState.data.perfTilesData.SFDC_CONNECTION_ERRORS"
              )}
            />
          </div>
        </div>
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15">
            <BarChartGrid barChartData={executionCountBarChartData} />
            <BarChartGrid barChartData={tableCountBarChartData} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dashboardState: (state: IRootState) => state.dashboard,
  auth: (state: IRootState) => state.auth
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(dashboardActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "dashboard", reducer });
const withSaga = injectSaga({ key: "dashboard", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  userIsNotAuthenticatedRedir,
  withRouter,
  withReducer,
  withSaga,
  Dimensions()
)(Dashboard);
