import * as React from "react";
// import Layout from '../Layout'
// import PageBase from '../../components/PageBase'
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

interface IDashboardProps {
  dashboardstate?: any;
  auth?: any;
  actions?: any;
}

export class Dashboard extends React.Component<IDashboardProps> {
  public render() {
    return (
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
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dashboardstate: (state: IRootState) => state.dashboard,
  auth: (state: IRootState) => state.auth
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(dashboardActions, dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  userIsNotAuthenticatedRedir,
  withRouter
)(Dashboard);
