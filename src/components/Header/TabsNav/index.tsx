import { Tab, Tabs } from 'material-ui/Tabs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { layoutActions } from '../../../containers/Layout/actions';
import { IMenu } from '../../../containers/Layout/menu';
import { IRootState } from '../../../IRootState';
import { scrollToMenuItemAndOpenViews } from '../../../containers/LeftDrawer/menuUtils';


interface ITabsNavHeaderProps extends RouteComponentProps<any> {
  tabStyle: any;
  actions: typeof layoutActions;
  selectedOpenedMenuIndex: number;
  openViews: IMenu[];
  menus: IMenu[];
}

class TabsNavHeader extends React.Component<ITabsNavHeaderProps> {

  private isNavigating: boolean;
  private tabs: React.ReactInstance | null;

  constructor(props: ITabsNavHeaderProps) {
    super(props);

    this.isNavigating = false;
    this.getTabsWidth = this.getTabsWidth.bind(this);
    this.navigateUrl = this.navigateUrl.bind(this);
  }

  public componentWillReceiveProps(nextProps: ITabsNavHeaderProps) {
    if (
      nextProps.selectedOpenedMenuIndex !== this.props.selectedOpenedMenuIndex
    ) {
      if (!this.isNavigating) {
        setTimeout(() => {
          const index = nextProps.selectedOpenedMenuIndex;

          (ReactDOM.findDOMNode(this.tabs!) as HTMLDivElement).scrollLeft = (index! - 1) * 200 + 100; // eslint-disable-line
        }, 300);
      }
      this.isNavigating = false;
    }
  }

  public getTabsWidth() {
    const totalOpenViews = this.props.openViews!.length;

    return {
      width: 200 * (!totalOpenViews ? 1 : totalOpenViews)
    };
  }

  public handleClick = (menuItem: IMenu, event: React.MouseEvent<{}>) => {
    const x = event.pageX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
    const y = event.pageY - (event.currentTarget as HTMLElement).offsetTop;
    const id = (event.currentTarget as HTMLElement).getAttribute('data-id');

    if (x > 180 && y > 17 && y < 30 && id && id !== 'dashboard') {
      const rootMenuItem = this.props.menus![0];
      this.navigateUrl(rootMenuItem);

      setTimeout(() => {
        this.props.actions!.closeView(id);
      }, 300);
    } else {
      this.navigateUrl(menuItem);
    }
  };

  public navigateUrl(menuItem: IMenu) {
    this.isNavigating = true;
    this.props.history.push(menuItem.url);

    scrollToMenuItemAndOpenViews(
      menuItem,
      this.props.menus!,
      this.props.openViews!
    );
  }

  public render() {
    const { tabStyle, selectedOpenedMenuIndex, openViews } = this.props;

    return (
      <Tabs
        className='header-close-tabs'
        style={tabStyle.tabsScrollbars}
        tabItemContainerStyle={this.getTabsWidth()}
        value={selectedOpenedMenuIndex}
        ref={
          tabs => {
            this.tabs = tabs;
          }
        }
      >
        {
          openViews!.length > 0
            ? openViews!.map(
              (menu, index) =>
                menu.id === 'dashboard' ? (
                  <Tab
                    key={menu.id}
                    label={menu.text}
                    value={index}
                    // tslint:disable-next-line jsx-no-lambda
                    onClick={(evt) => this.handleClick(menu, evt)}
                    containerElement={< Link to={menu.url} > `` </Link>}
                  />
                ) : (
                    <Tab
                      key={menu.id}
                      label={menu.text}
                      value={index}
                      // tslint:disable-next-line jsx-no-lambda
                      onClick={evt => this.handleClick(menu, evt)}
                      containerElement={< div className="close-tab" />}
                      data-id={menu.id}
                      data-url={menu.url}
                    />
                  )
            )
            : null
        }
      </Tabs>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  menus: (store: IRootState) => store.layout.menus,
  openViews: (store: IRootState) => store.layout.openViews,
  selectedOpenedMenuIndex: (store: IRootState) => store.layout.selectedOpenedMenuIndex,
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(layoutActions, dispatch)

  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TabsNavHeader)

);


