import * as React from 'react';
import { RouteComponentProps, withRouter, Route, Redirect } from 'react-router-dom';
import Login from '../Login'

// import Dashboard from '../../containers/DashboardPage';
import './App.css';
import { Dashboard } from '../Dashboard';



interface IAppProps extends RouteComponentProps<any> {

}

export class App extends React.Component<IAppProps> {

  public render() {
    return (
      <div>
        {' '}
        // tslint:disable-next-line jsx-no-lambda
        <Route exact={true} path="/" render={this.redirectToDashboard} />
        <Route exact={true} path="/dashboard" component={Dashboard} />
        <Route exact={true} path="/login" component={Login} />

      </div>

    );
  };

  public redirectToDashboard() {
    return <Redirect to="/dashboard" />
  }


}



// const mapStateToProps = createStructuredSelector({
//   appStore: makeSelectGlobal(),
//   auth: makeSelectFirebaseAuth()
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(appActions, dispatch)
//   };
// }

export default withRouter((App));
