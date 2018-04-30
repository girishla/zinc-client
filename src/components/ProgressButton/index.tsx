import RaisedButton from 'material-ui/RaisedButton';
import { green500, green700 } from 'material-ui/styles/colors';
import * as React from 'react';
import Spinner from '../../components/Spinner';
import classNames from '../../utils/classnames';

const classes: any = {
  buttonProgress: {
    color: green500,
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%',
  },
  buttonSuccess: {
    '&:hover': {
      backgroundColor: green700
    },
    backgroundColor: green500,

  },
  root: {
    alignItems: 'center',
    display: 'flex',
  },
  wrapper: {
    margin: 0,
    position: 'relative'
  },

  fabProgress: {
    color: '',
    left: -2,
    position: 'absolute',
    top: -2,
  },

};

interface IProgressButtonProps {

  loading: boolean;
  success: boolean;
  style: any;
  onSignIn: any;
  label: any;
}

class ProgressButton extends React.Component<IProgressButtonProps> {
  public render() {
    const { loading, success, style } = this.props;

    const buttonClassname = classNames({
      [(classes.buttonSuccess as any)]: success
    });


    return (
      <div className={classes.root} >
        <div className={classes.wrapper}>
          <RaisedButton
            primary={true}
            className={buttonClassname}
            disabled={loading}
            onClick={this.props.onSignIn}
            style={style}
            label={loading || this.props.label}
          >
            {
              loading && (
                <Spinner
                  name="three-bounce"
                  color="darkgrey"
                />
              )
            }
          </RaisedButton>

        </div>
      </div>
    );
  }
}


export default ProgressButton;
