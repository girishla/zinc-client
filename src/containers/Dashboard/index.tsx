import * as React from 'react'
import Layout from '../Layout'
import PageBase from '../../components/PageBase'
import { createStructuredSelector } from 'reselect';
import { IRootState } from '../../IRootState';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { dashboardActions } from './actions';
// import { withRouter } from 'react-router-dom';
import { userIsNotAuthenticatedRedir } from '../Login/auth-routing';


interface IDashboardProps {

    dashboardstate: any;
    auth: any;
    actions: any;

}

export class Dashboard extends React.Component<IDashboardProps> {

    public render() {
        return (
            <Layout>
                <PageBase navigation="Zinc / Dashboard" noWrapContent={true} loading={false}>
                    <h1>Welcome to Zinc</h1>
                </PageBase>
            </Layout>
        )
    }

}


const mapStateToProps = createStructuredSelector({
    dashboardstate: (state: IRootState) => state.dashboard,
    auth: (state: IRootState) => state.auth,
});

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(dashboardActions, dispatch)
    };
}


export default compose(
    userIsNotAuthenticatedRedir,
    connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);

