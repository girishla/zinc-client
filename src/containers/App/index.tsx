import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
import * as React from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Router,
  Switch,
  withRouter
} from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import PageBase from "../../components/PageBase";
import Dashboard from "../Dashboard";
import ZincJobs from "../Job";
import ZincJobExecutions from "../JobExecution";
import ZincJobStepExecutions from "../JobStepExecution";
import ZincJobSchedules from "../JobSchedule";
import ZincJobScheduleDetail from "../JobScheduleDetail";
import Layout from "../Layout";
import Login from "../Login";
import "./App.css";
import "./sldsOverrides.css";
import PageNotFound from "../PageNotFound";

interface IAppProps extends RouteComponentProps<any> {}

const RouteWithLayout = ({ component, ...rest }: any) => {
  return (
    <Layout>
      <PageBase noWrapContent={true} loading={false}>
        <Route {...rest} component={component} />
      </PageBase>
    </Layout>
  );
};

export class App extends React.Component<IAppProps> {
  public render() {
    return (
      <Router {...this.props}>
        <div>
          <Switch>
            <Route
              {...this.props}
              exact={true}
              path="/login"
              component={Login}
            />
            <Route exact={true} path="/" render={this.redirectToDashboard} />
            <RouteWithLayout
              {...this.props}
              exact={true}
              path="/dashboard"
              component={Dashboard}
            />
            <RouteWithLayout exact={true} path="/jobs" component={ZincJobs} />
            <RouteWithLayout
              exact={true}
              path="/jobs/executions"
              component={ZincJobExecutions}
            />
            <RouteWithLayout
              exact={true}
              path="/jobs/:jobName/executions"
              component={ZincJobExecutions}
            />
            <RouteWithLayout
              exact={true}
              path="/jobs/:jobName"
              render={() => <Redirect to="/jobs" />}
            />
            <RouteWithLayout
              exact={true}
              path="/jobs/executions/:executionId"
              render={() => <Redirect to="/jobs/executions" />}
            />
            <RouteWithLayout
              exact={true}
              path="/jobs/:jobName/:jobInstanceId/executions"
              component={ZincJobExecutions}
            />
            <RouteWithLayout
              exact={true}
              path="/jobs/executions/:executionId/steps"
              component={ZincJobStepExecutions}
            />
            <RouteWithLayout
              exact={true}
              path="/schedule"
              component={ZincJobSchedules}
            />
            <RouteWithLayout
              exact={true}
              path="/schedule/:scheduleName"
              component={ZincJobScheduleDetail}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }

  public redirectToDashboard() {
    return <Redirect to="/dashboard" />;
  }
}

const mapStateToProps = createStructuredSelector({
  auth: (store: IRootState) => store.auth
});

export default compose(connect(mapStateToProps, null), withRouter)(App);
