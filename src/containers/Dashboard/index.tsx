import * as React from 'react'
import Layout from '../Layout'
import PageBase from '../../components/PageBase'
import { createStructuredSelector } from 'reselect';
import { IRootState } from '../../IRootState';
import { bindActionCreators, compose } from 'redux';
import withWidth from 'material-ui/utils/withWidth';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { dashboardActions } from './actions';


interface IDashboardProps extends RouteComponentProps<any> {

    dummy?: string;

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
    auth: (state: IRootState) => state.login,
});

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(dashboardActions, dispatch)
    };
}




export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withWidth(),
)(withRouter(Dashboard));
