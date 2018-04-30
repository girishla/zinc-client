import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import { grey500, white, red500 } from 'material-ui/styles/colors';

const styles: any = {
  boxContainer: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    margin: 0,
    minHeight: '100vh',
    padding: 0,
  },
  logoImg: {
    marginRight: 10,
    minWidth: 25
  },
  title: {
    fontSize: 22,
    fontWeight: typography.fontWeightMedium,
    height: 60,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
  },
  paper: {
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: 'white'
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  boxBtn: {
    float: 'right'
  },
  boxBtnSignin: {
    width: '80%',
    marginLeft: '10%'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnSpan: {
    marginLeft: 5
  },
  buttonsContainer: {
    marginTop: 50
  },
  errorMessage: {
    color: red500
  },
  instructions: {
    textAlign: 'center',
    color: 'darkgrey'
  },
  logoContainer: {
    textAlign: 'center',
    width: 360,
    height: 80,
    paddingTop: 20
  },
  logoImage: {
    width: 295,
    height: 54
  },
  logoSmallContainer: {
    position: 'absolute',
    right: 20,
    top: 20
  }
};

export default styles;
