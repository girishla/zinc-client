import * as React from "react";

import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { dashboardActions } from "./actions";
// import { withRouter } from 'react-router-dom';
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { withRouter } from "react-router";
import DashboardInfoBox from "src/components/DashboardInfoBox";
import { cyan500, grey500 } from "material-ui/styles/colors";
import { VictoryBar, VictoryTheme, VictoryAxis, VictoryChart } from "victory";
import Dimensions from "react-dimensions";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";

interface IDashboardProps {
  dashboardData: any;
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

  public render() {
    return (
      <div>
        <div className="row">
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={grey500}
              iconColor={cyan500}
              title="SOAP API USAGE"
              value="7051"
            />
          </div>
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={grey500}
              iconColor={cyan500}
              title="BULK API USAGE"
              value="100"
            />
          </div>
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={grey500}
              iconColor={cyan500}
              title="REPLICATION API USAGE"
              value="299"
            />
          </div>
          <div
            style={{ paddingLeft: 5, paddingRight: 5 }}
            className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 "
          >
            <DashboardInfoBox
              Icon={"thumb_up"}
              color={grey500}
              iconColor={cyan500}
              title="CONNECTION ERRORS"
              value="0"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15">
            <VictoryChart width={this.props.containerWidth} height={200}>
              <VictoryBar
                standalone={false}
                style={{ data: { fill: "#c7b5e3" } }}
                data={[
                  {
                    x: 1,
                    y: 20
                  },
                  { x: 2, y: 33 },
                  { x: 3, y: 50 },
                  { x: 4, y: 70 },
                  { x: 5, y: 60 }
                ]}
              />
              <VictoryAxis
                standalone={false}
                crossAxis={true}
                width={this.props.containerWidth}
                height={200}
                domain={[0, 10]}
                tickValues={["hello", "world", "super"]}
                theme={VictoryTheme.material}
                style={{ axis: { stroke: "none" } }}
              />
            </VictoryChart>
          </div>
          <pre>{JSON.stringify(this.props.dashboardData, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dashboardData: (state: IRootState) => state.dashboard,
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
