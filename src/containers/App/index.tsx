import * as React from 'react';
import { RouteComponentProps, withRouter, Route, Redirect, Switch, Router } from 'react-router-dom';
import Login from '../Login'

import './App.css';
import Dashboard from '../Dashboard';
import ZincJobs from '../Jobs';
import Layout from '../Layout'
import PageBase from '../../components/PageBase'
import { connect } from 'react-redux';
import { IRootState } from '../../IRootState';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

interface IAppProps extends RouteComponentProps<any> {

}


const RouteWithLayout = ({ component, ...rest }: any) => {
  return (
    <Layout>
      <PageBase navigation={'Zinc'} noWrapContent={true} loading={false} >
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
            <Route {...this.props} exact={true} path="/login" component={Login} />
            <Route exact={true} path="/" render={this.redirectToDashboard} />
            <RouteWithLayout {...this.props} exact={true} path="/dashboard" component={Dashboard} />
            <RouteWithLayout exact={true} path="/jobs" component={ZincJobs} />
            {/* <Route path="*" component={PageNotFound} /> */}
          </Switch>
        </div>
      </Router>
    );

  }



  public redirectToDashboard() {
    return <Redirect to="/dashboard" />
  }


}

const mapStateToProps = createStructuredSelector({
  auth: (store: IRootState) => store.auth
});



export default compose(
  connect(mapStateToProps, null),
  withRouter
)(App);
