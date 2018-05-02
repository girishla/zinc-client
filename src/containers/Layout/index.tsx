import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Header from '../../components/Header';
import { IRootState } from '../../IRootState';

import LeftDrawer from '../LeftDrawer';
import Theme, { ITheme } from '../../theming/theme';
import { layoutActions } from './actions';
import { getCurrentTheme, updateContentDimensions } from './layout-utils';
import Styles from './styles';
import injectReducer from '../../utils/injectReducer';
import reducer from '../Login/reducer';
import saga from '../Login/saga';
import injectSaga from '../../utils/injectSaga';
import { userIsNotAuthenticatedRedir } from '../Login/auth-routing';
import { authActions } from '../Login/actions';



const theme = new Theme();

export interface ILayoutProps extends RouteComponentProps<any> {
  children: any,
  width: any,
  currentTheme: string,
  isBoxedLayout: boolean,
  actions: typeof layoutActions,
  authActions: typeof authActions;
}



interface ILayoutState {
  navDrawerOpen: boolean,
  currentTheme: ITheme,
  isMobileBrowser: boolean
  width: number
};


class Layout extends React.Component<ILayoutProps, ILayoutState> {


  public state: ILayoutState = {
    navDrawerOpen: false,
    currentTheme: theme.get('lightTheme'),
    isMobileBrowser: false,
    width: LARGE
  };



  constructor(props: ILayoutProps) {

    super(props);

    if (
      /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.state.currentTheme = theme.get(props.currentTheme!)
    }

    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.renderPages = this.renderPages.bind(this);
  }

  public componentWillMount() {
    const { width } = this.props;
    this.setState({ navDrawerOpen: width === LARGE });

    // dispatch this action to load the menu
    this.props.actions!.loadMenu();
  }

  public componentDidMount() {
    window.addEventListener('resize', updateContentDimensions);
    this.props.authActions.getProfile();
  }

  public componentWillReceiveProps(nextProps: ILayoutProps) {

    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }

    if (nextProps.currentTheme !== this.props.currentTheme) {
      this.setState({
        currentTheme: theme.get(nextProps.currentTheme!)
      });
    }
  }

  public componentWillUpdate() {
    updateContentDimensions();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', updateContentDimensions);
  }

  public handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  public renderPages() {
    const { width, navDrawerOpen } = this.state;
    const currentTheme = this.state.currentTheme;
    const styles = Styles(currentTheme, width, navDrawerOpen);
    const path = this.props.location.pathname;
    const currentRoute = path;

    return (
      <div
        className={
          this.props.currentTheme +
          (this.props.isBoxedLayout ? ' layout-boxed' : ' layout-fluid')
        }
      >
        <Header
          styles={styles.header}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
        />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          location={this.props.location}
          isMobileBrowser={this.state.isMobileBrowser}
          currentRoute={currentRoute}
          navDrawerToggle={this.handleChangeRequestNavDrawer}
        />

        <div className="main-container" style={styles.container}>
          <ReactCSSTransitionGroup
            transitionName="transition-animation"
            transitionAppear={true}
            transitionAppearTimeout={1500}
            transitionEnterTimeout={0}
            transitionLeave={false}
          >
            {this.props.children}
          </ReactCSSTransitionGroup>

        </div>
      </div>
    );
  }

  public render() {
    return (
      <MuiThemeProvider muiTheme={getCurrentTheme(this.props.currentTheme!)}>
        {this.renderPages()}
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentTheme: (state: IRootState) => state.layout.currentTheme,
  isBoxedLayout: (state: IRootState) => state.layout.isBoxedLayout,

});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(layoutActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}


const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWidth(),
  withReducer,
  withSaga,
  withRouter,
  userIsNotAuthenticatedRedir,
)((Layout));

