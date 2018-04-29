import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { layoutActions } from '../../containers/Layout/actions';
import { IMenu } from '../../containers/Layout/menu';
import { IRootState } from '../../IRootState';
import PlaceHolder from '../../placeholderavatar.svg';
import Theme, { ITheme } from '../../theming/theme';
import MenuItems from './MenuItems';
import { findMenuItem, scrollToMenuItem, scrollToOpenViewsItem } from './menuUtils';
import OpenViewsItems from './OpenViewItems';
import Styles from './styles';

const theme = new Theme();


interface ILeftDrawerProps extends RouteComponentProps<any> {
  menus: IMenu[];
  openViews: IMenu[];
  currentTheme: string;
  navDrawerOpen: boolean;
  isMobileBrowser: boolean;
  showOpenViews: boolean;
  actions: typeof layoutActions;
  navDrawerToggle: () => void;
}

interface ILeftDrawerState {
  currentTheme: ITheme;
}

class LeftDrawer extends React.Component<ILeftDrawerProps, ILeftDrawerState> {

  public state: ILeftDrawerState;

  constructor(props: ILeftDrawerProps) {
    super(props);

    this.state = {
      currentTheme: theme.get(props.currentTheme)
    };

    this.initialMenuItem = this.initialMenuItem.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleClickOpenView = this.handleClickOpenView.bind(this);
    this.navigateUrl = this.navigateUrl.bind(this);
    this.animateRootMenu = this.animateRootMenu.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('resize', this.updateMenuDimensions);
  }

  public componentWillReceiveProps(newProps: ILeftDrawerProps) {
    if (
      newProps.menus!.length > 0 &&
      newProps.menus!.length !== this.props.menus!.length
    ) {
      this.initialMenuItem(newProps.menus!);
    }

    if (newProps.currentTheme !== this.props.currentTheme) {
      this.setState({
        currentTheme: theme.get(newProps.currentTheme)
      });
    }
  }

  public componentWillUpdate() {
    this.updateMenuDimensions();
  }

  public componentDidUpdate() {
    this.updateMenuDimensions();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateMenuDimensions);
  }

  public updateMenuDimensions() {
    const menuElement: HTMLDivElement | null = document.querySelector('.views-menu > div > div');

    if (menuElement) {
      const height = window.innerHeight - menuElement.offsetTop;
      menuElement.style.height = `${height - 15}px`;
    }
  }

  public initialMenuItem(menus: IMenu[]) {
    const url = this.props.location.pathname;
    const { foundMenuItem } = findMenuItem(menus, 'url', url);

    if (foundMenuItem && foundMenuItem.id) {
      this.props.actions!.selectMenuItem(foundMenuItem.id);
      this.props.actions!.openView(foundMenuItem);
      scrollToMenuItem(foundMenuItem, menus);
    }
  }

  public handleClickMenu(menuItem: IMenu) {
    this.navigateUrl(menuItem, true);
  }

  public handleClickOpenView(menuItem: IMenu) {
    this.navigateUrl(menuItem, false);
  }

  public navigateUrl(menuItem: IMenu, isNavigatingFromMenu: boolean) {
    if (menuItem && menuItem.url) {
      this.props.history.push(menuItem.url);

      const { foundMenuItem } = findMenuItem(this.props.openViews!, 'url', menuItem.url);
      if (!foundMenuItem) {
        this.props.actions!.openView(menuItem);
      }

      if (isNavigatingFromMenu) {
        scrollToOpenViewsItem(menuItem, this.props.openViews!);
      } else {
        scrollToMenuItem(menuItem, this.props.menus!);
      }
    }
  }

  public animateRootMenu(menu: IMenu, child: IMenu) {
    let className = ' hide';

    if (
      (menu.open && child.animatingRootMenu && !menu.willCloseRootMenu) ||
      child.animatingRootMenu === undefined
    ) {
      className = '';
    }
    return className;
  }


  public render() {
    const currentTheme = this.state.currentTheme;
    const styles = Styles(currentTheme);
    const { navDrawerOpen } = this.props;
    const { email, displayName } = { email: '', displayName: '' };

    return (
      <Drawer
        className={`left-drawner${navDrawerOpen ? ' open' : ' close'}`}
        docked={!this.props.isMobileBrowser}
        open={navDrawerOpen}
        onRequestChange={this.props.navDrawerToggle}
      >
        <div style={styles.logo}>Zinc</div>
        <div style={styles.avatar.div}>
          <Avatar
            src={PlaceHolder}
            size={50}
            style={styles.avatar.icon}
          />
          <span style={styles.avatar.span}>
            {displayName ||
              email.substring(
                0,
                email.indexOf('@')
              )}
          </span>
        </div>
        {this.props.showOpenViews ? (
          <OpenViewsItems
            styles={styles}
            isMobileBrowser={this.props.isMobileBrowser}
            handleClickMenu={this.handleClickOpenView}
            animateRootMenu={this.animateRootMenu}
          />
        ) : null}
        <MenuItems
          styles={styles}
          isMobileBrowser={this.props.isMobileBrowser}
          animateRootMenu={this.animateRootMenu}
          handleClickMenu={this.handleClickMenu}
        />
      </Drawer>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentTheme: (store: IRootState) => store.layout.currentTheme,
  menus: (store: IRootState) => store.layout.menus,
  openViews: (store: IRootState) => store.layout.openViews,
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(layoutActions, dispatch)
  };
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)
);

