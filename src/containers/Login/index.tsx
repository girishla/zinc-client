import * as React from 'react'
import { connect } from 'react-redux'
import Form from './form'

import { loginActions } from './actions'
import { createStructuredSelector } from 'reselect';
import { IRootState } from '../../IRootState';
import { bindActionCreators, compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import themeLight from '../../theming/themes/theme-light';
// import './styles/_form-page.css'
// import './styles/_form.css'
// import './styles/_buttons.css'



interface ILoginProps extends RouteComponentProps<any> {
    formState: any;
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
        const { currentlySending, error, actions } = this.props;
        let { formState } = this.props;
        if (!formState) {
            formState = { username: '', password: '' };
        }

        return (
            <MuiThemeProvider muiTheme={themeLight}>
                <Form formState={formState} changeForm={actions.changeForm} onSubmit={this._login} btnText={'Login'} error={error} currentlySending={currentlySending} />
            </MuiThemeProvider>

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
    formState: (store: IRootState) => store.login && store.login.formState,
    error: (store: IRootState) => store.login && store.login.error,
    currentlySending: (store: IRootState) => store.login && store.login.currentlySending,

});

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReducer,
    withSaga,
    withRouter,
)(Login);
