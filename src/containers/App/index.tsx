import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PageBase from '../../components/PageBase';
import Layout from '../Layout';
// import Dashboard from '../../containers/DashboardPage';
import './App.css';


interface IAppProps extends RouteComponentProps<any> {

}

export class App extends React.Component<IAppProps> {

  public render() {
    return (
      <div>
        {' '}
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        {/* <Route exact path="/login" component={Auth} /> */}
        <Layout>
          <PageBase navigation="Zinc / Dashboard" noWrapContent={true} loading={false}>
            <h1>Welcome to Zinc</h1>
          </PageBase>
        </Layout>

      </div>

    );
  };
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
