import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { layoutActions } from '../../containers/Layout/actions';
import { IRootState } from '../../IRootState';
import Theme, { ITheme } from '../../theming/theme';
import Styles from './styles';
import TabNav from './TabsNav';
import { loginActions } from '../../containers/Login/actions';

interface IHeaderProps extends RouteComponentProps<any> {
  styles: any;
  actions: typeof layoutActions;
  loginActions: typeof loginActions;
  currentTheme: string;
  isBoxedLayout: boolean;
  handleChangeRequestNavDrawer: React.MouseEventHandler<{}>
  showTabs: boolean;
}
interface IHeaderState {
  currentTheme: ITheme;
}
const theme = new Theme();

// add this.props.firebase
class Header extends React.Component<IHeaderProps, IHeaderState> {

  public state: IHeaderState;

  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      currentTheme: theme.get(props.currentTheme)
    };

    this.signOut = this.signOut.bind(this);
  }

  public componentWillReceiveProps(newProps: IHeaderProps) {
    if (newProps.currentTheme !== this.props.currentTheme) {
      this.setState({
        currentTheme: theme.get(newProps.currentTheme)
      });
    }
  }

  public signOut() {
    this.props.loginActions.logout();
  }


  public render() {
    const { styles, handleChangeRequestNavDrawer, isBoxedLayout } = this.props;
    const style = Styles(isBoxedLayout, this.state.currentTheme);


    let authButton = null;
    // if (isEmpty(auth)) {
    //   authButton = <MenuItem primaryText="Signin/Signup" onClick={()=>''} />;
    // } else {
    //   authButton = <MenuItem primaryText="Sign out" onClick={this.signOut} />;
    // }

    authButton = <MenuItem primaryText="Sign out" onClick={this.signOut} />;


    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }
          }
          title={<div> {this.props.showTabs ? <TabNav tabStyle={style} /> : null}</div>}

          iconElementLeft={
            <IconButton
              iconStyle={style.iconButton}
              style={style.menuButton}
              onClick={handleChangeRequestNavDrawer}
            >
              <FontIcon
                color={this.state.currentTheme.appBarMenuButtonColor}
                className="material-icons"
              >
                <span>menu</span>
              </FontIcon>
            </IconButton>
          }

          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu
                // color={this.state.currentTheme.appBarMenuButtonColor}
                iconButtonElement={
                  <IconButton>
                    <FontIcon
                      color={this.state.currentTheme.appBarMenuButtonColor}
                      className="material-icons"
                    >
                      <span>more_vert_icon</span>
                    </FontIcon>
                  </IconButton>
                }
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                {authButton}
              </IconMenu>
            </div>

          }
        />
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  currentTheme: (state: IRootState) => state.layout.currentTheme,
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(layoutActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);