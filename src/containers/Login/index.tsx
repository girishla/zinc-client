import * as React from 'react'
import { connect } from 'react-redux'
import Form from './form'

import { authActions } from './actions'
import { createStructuredSelector } from 'reselect';
import { IRootState } from '../../IRootState';
import { bindActionCreators, compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// import reducer from './reducer';
// import saga from './saga';
// import injectReducer from '../../utils/injectReducer';
// import injectSaga from '../../utils/injectSaga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import themeLight from '../../theming/themes/theme-light';
import { userIsAuthenticatedRedir } from './auth-routing';



interface ILoginProps extends RouteComponentProps<any> {
    formState: any;
    error: string;
    currentlySending: boolean;
    actions: typeof authActions;
    currentTheme: string;
}

class Login extends React.Component<ILoginProps> {
    public props: ILoginProps;
    constructor(props: ILoginProps) {
        super(props)

        this._login = this._login.bind(this)
    }

    public render() {
        const { currentlySending, error, actions, currentTheme } = this.props;
        let { formState } = this.props;
        if (!formState) {
            formState = { username: '', password: '' };
        }

        return (
            <MuiThemeProvider muiTheme={themeLight}>
                <Form currentTheme={currentTheme} formState={formState} changeForm={actions.changeForm} onSubmit={this._login} btnText={'Login'} error={error} currentlySending={currentlySending} />
            </MuiThemeProvider>

        )
    }

    public _login(username: string, password: string) {
        this.props.actions.loginRequest({ username, password });
    }
}

const mapStateToProps = createStructuredSelector({
    formState: (store: IRootState) => store.auth && store.auth.formState,
    error: (store: IRootState) => store.auth && store.auth.error,
    currentlySending: (store: IRootState) => store.auth && store.auth.currentlySending,
    currentTheme: (store: IRootState) => store.layout && store.layout.currentTheme,
});

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // withReducer,
    // withSaga,
    userIsAuthenticatedRedir,
    withRouter,
)(Login);
