import * as React from 'react';
import { RouteComponentProps, withRouter, Route, Redirect } from 'react-router-dom';
import Login from '../Login'

import './App.css';
import { Dashboard } from '../Dashboard';
import { authActions } from '../Login/actions';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from '../Login/reducer';
import saga from '../Login/saga';

interface IAppProps extends RouteComponentProps<any> {
  authActions: typeof authActions
}

export class App extends React.Component<IAppProps> {

  public render() {
    return (
      <div>
        <Route exact={true} path="/" render={this.redirectToDashboard} />
        <Route exact={true} path="/dashboard" component={Dashboard} />
        <Route exact={true} path="/login" component={Login} />

      </div>

    );
  };

  public redirectToDashboard() {
    return <Redirect to="/dashboard" />
  }

  public componentDidMount() {
    this.props.authActions.getProfile();
  }


}





function mapDispatchToProps(dispatch: any) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });


export default compose(
  connect(null, mapDispatchToProps),
  withReducer,
  withSaga,
  withRouter)
  (App);
