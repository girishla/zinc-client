import * as React from 'react'

import { createStructuredSelector } from 'reselect';
import { IRootState } from '../../IRootState';
import { jobsActions } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { userIsNotAuthenticatedRedir } from '../Login/auth-routing';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';



interface IJobsProps {

    jobs: any;
    jobsActions: typeof jobsActions;

}

class ZincJobs extends React.Component<IJobsProps> {
    public props: IJobsProps;

    constructor(props: IJobsProps) {
        super(props)
    }

    public componentDidMount() {
        this.props.jobsActions.loadJobs();
        console.log(this.props)

    }

    public render() {
        return (
            <h1>List Of Jobs</h1>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    jobs: (store: IRootState) => store.jobs
});

function mapDispatchToProps(dispatch: any) {
    return {
        jobsActions: bindActionCreators(jobsActions, dispatch)
    };
}

const withReducer = injectReducer({ key: 'jobs', reducer });
const withSaga = injectSaga({ key: 'jobs', saga });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReducer,
    withSaga,
    userIsNotAuthenticatedRedir,
)(ZincJobs);


