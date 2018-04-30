import * as React from 'react'
import ErrorMessage from './ErrorMessage'
import LoadingButton from './LoadingButton'


interface ILoginFormProps {
    formState: any;
    error: string;
    currentlySending: boolean;
    btnText: string;
    changeForm: any;
    onSubmit: any;
}

class LoginForm extends React.Component<ILoginFormProps> {
    public props: ILoginFormProps;
    constructor(props: ILoginFormProps) {
        super(props)

        this._onSubmit = this._onSubmit.bind(this)
        this._changeUsername = this._changeUsername.bind(this)
        this._changePassword = this._changePassword.bind(this)
    }
    public render() {
        const { error } = this.props

        const { username, password } = this.props.formState;

        return (
            <form className='form' onSubmit={this._onSubmit}>
                {error ? <ErrorMessage error={error} /> : null}
                <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        type='text'
                        id='zincusername'
                        value={username}
                        placeholder=''
                        onChange={this._changeUsername}
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck={false} />
                    <label className='form__field-label' htmlFor='username'>
                        Username
          </label>
                </div>
                <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        id='zincpassword'
                        type='password'
                        value={password}
                        placeholder=''
                        onChange={this._changePassword} />
                    <label className='form__field-label' htmlFor='password'>
                        Password
          </label>
                </div>
                <div className='form__submit-btn-wrapper'>
                    {this.props.currentlySending ? (
                        <LoadingButton />
                    ) : (
                            <button className='form__submit-btn' type='submit'>
                                {this.props.btnText}
                            </button>
                        )}
                </div>
            </form>
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