import * as React from 'react'
import { connect } from 'react-redux'
import Form from './form'

import { loginActions } from './actions'
import { createStructuredSelector } from 'reselect';
import { IRootState } from '../../IRootState';
import { bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ILoginProps extends RouteComponentProps<any> {
    username: string;
    password: string;
    error: string;
    currentlySending: boolean;
    actions: typeof loginActions;
}

class Login extends React.Component<ILoginProps> {
    public props: ILoginProps;
    constructor(props: ILoginProps) {
        super(props)

        this._login = this._login.bind(this)
    }

    public render() {
        const { username, password, currentlySending, error, actions } = this.props;

        return (
            <div className='form-page__wrapper'>
                <div className='form-page__form-wrapper'>
                    <div className='form-page__form-header'>
                        <h2 className='form-page__form-heading'>Login</h2>
                    </div>
                    <Form username={username} password={password} changeForm={actions.changeForm} onSubmit={this._login} btnText={'Login'} error={error} currentlySending={currentlySending} />
                </div>
            </div>
        )
    }

    public _login(username: string, password: string) {
        this.props.actions.loginRequest({ username, password });
    }
}

// Login.propTypes = {
//     data: React.PropTypes.object,
//     history: React.PropTypes.object,
//     dispatch: React.PropTypes.func
// }



const mapStateToProps = createStructuredSelector({
    username: (store: IRootState) => store.login.username,
    password: (store: IRootState) => store.login.password,
    error: (store: IRootState) => store.login.error,
    currentlySending: (store: IRootState) => store.login.currentlySending,

});

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Login)
);
