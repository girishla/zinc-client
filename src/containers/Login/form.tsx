import * as React from 'react'
import ErrorMessage from './ErrorMessage'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import styles from './styles';
import ProgressButton from '../../components/ProgressButton';
import Logo from '../../components/Logo'
import Theme, { ITheme } from '../../theming/theme';


interface ILoginFormProps {
    formState: any;
    error: string;
    currentlySending: boolean;
    btnText: string;
    changeForm: any;
    onSubmit: any;
    currentTheme: string;
}

interface IFormState {
    currentTheme: ITheme;
}

const theme = new Theme();
class LoginForm extends React.Component<ILoginFormProps, IFormState> {
    public props: ILoginFormProps;
    public state: IFormState;

    constructor(props: ILoginFormProps) {
        super(props)
        this.state = {
            currentTheme: theme.get(props.currentTheme)
        };
        this._onSubmit = this._onSubmit.bind(this)
        this._changeUsername = this._changeUsername.bind(this)
        this._changePassword = this._changePassword.bind(this)
    }

    public componentWillReceiveProps(newProps: ILoginFormProps) {
        if (newProps.currentTheme !== this.props.currentTheme) {
            this.setState({
                currentTheme: theme.get(newProps.currentTheme)
            });
        }
    }

    public render() {
        const { error } = this.props

        const { username, password } = this.props.formState;

        return (
            <div style={styles.boxContainer}>
                <Paper style={styles.paper}>
                    <Logo colour={this.state.currentTheme.logoBackgroundColor} width="150pt" height="75pt" />
                    <div className="title" style={styles.title}>
                        Login
                    </div>
                    <form className='form' onSubmit={this._onSubmit}>
                        {error ? <ErrorMessage error={error} /> : null}
                        <TextField
                            style={styles.textField}
                            hintText="User Name"
                            floatingLabelText="User Name"
                            fullWidth={true}
                            name="username"
                            value={username}
                            onChange={this._changeUsername}
                            autoComplete="on"
                        />
                        <TextField
                            style={styles.textField}
                            name="password"
                            hintText="Password"
                            floatingLabelText="Password"
                            fullWidth={true}
                            type="password"
                            value={password}
                            onChange={this._changePassword}
                            autoComplete="on"
                        />

                        <div style={styles.buttonsContainer}>
                            {/* <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                  checked={this.props.rememberMe}
                  onCheck={this.props.onRememberMeChange}
                /> */}

                            <ProgressButton
                                style={Object.assign(styles.boxBtnSignin, styles.flatButton)}
                                label="Login"
                                onSignIn={this._onSubmit}
                                success={true}
                                loading={this.props.currentlySending}
                            />
                        </div>

                    </form>
                </Paper>
            </div>
        )
    }

    public _changeUsername(event: any) {
        this._emitChange({ ...this.props.formState, username: event.target.value })
    }

    public _changePassword(event: any) {
        this._emitChange({ ...this.props.formState, password: event.target.value })
    }

    public _emitChange(newFormState: any) {
        this.props.changeForm(newFormState);
    }

    public _onSubmit(event: any) {
        event.preventDefault()
        this.props.onSubmit(this.props.formState.username, this.props.formState.password)
    }
}

// Form.propTypes = {
//     dispatch: React.PropTypes.func,
//     data: React.PropTypes.object,
//     onSubmit: React.PropTypes.func,
//     changeForm: React.PropTypes.func,
//     btnText: React.PropTypes.string,
//     error: React.PropTypes.string,
//     currentlySending: React.PropTypes.bool
// }




export default LoginForm;