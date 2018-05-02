import { ListItem } from 'material-ui/List';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { layoutActions } from '../../../containers/Layout/actions';
import { IMenu } from '../../../containers/Layout/menu';
import { IRootState } from '../../../IRootState';
import SelectableList from '../../../components/SelectableList';
import { findParentMenuItem } from '../menuUtils';



interface IMenuItemProps {
  isMobileBrowser: boolean;
  menus: IMenu[];
  selectedMenuItem: IMenu;
  selectedMenuIndex: number;
  actions: typeof layoutActions;
  styles: any;
  animateRootMenu: any;
  handleClickMenu: any;
}

interface IMenuItemState {

  isMobileBrowser: boolean;
  menusHasItems: boolean;
}

class MenuItems extends React.Component<IMenuItemProps, IMenuItemState> {

  public state: IMenuItemState;
  private menuLoaded: boolean;
  private selectableMenuList: any;


  constructor(props: IMenuItemProps) {
    super(props);

    this.state = {
      isMobileBrowser: props.isMobileBrowser,
      menusHasItems: true
    };

    this.menuLoaded = false;
    this.handleMenusNestedListToggle = this.handleMenusNestedListToggle.bind(this);
    this.handleMenuItemsNestedListToggle = this.handleMenuItemsNestedListToggle.bind(this);
    this.animateMenu = this.animateMenu.bind(this);
    this.setMenuItemFocus = this.setMenuItemFocus.bind(this);
  }

  public componentWillReceiveProps(newProps: IMenuItemProps) {
    if (newProps.selectedMenuIndex !== this.props.selectedMenuIndex) {
      this.selectableMenuList.setSelectedIndex(newProps.selectedMenuIndex);
    }

    if (
      (newProps.menus.length > 0 &&
        newProps.menus.length === this.props.menus.length &&
        !this.menuLoaded) ||
      (this.menuLoaded &&
        newProps.selectedMenuItem !== this.props.selectedMenuItem)
    ) {
      this.menuLoaded = true;
      this.setMenuItemFocus(newProps.selectedMenuItem);
    }
  }

  public setMenuItemFocus(menuItem: IMenu) {
    const menus = this.props.menus;
    const menu: IMenu | undefined = findParentMenuItem(menus, menuItem);

    if (menu && this[menu!.id] && !this[menu!.id].props.open) {
      this.handleMenuItemsNestedListToggle(this[menu!.id]);
    }
  }

  public handleMenusNestedListToggle = (item: any) => {
    if (!this.state.isMobileBrowser) {
      const rootMenuName = 'menus';
      if (!item.state.open) {
        this.props.actions.animateRootMenus(rootMenuName, true);
        setTimeout(() => {
          this.props.actions.toggleRootMenus(rootMenuName);
        }, 100);
      } else {
        this.props.actions.toggleRootMenus(rootMenuName);
        setTimeout(() => {
          this.props.actions.animateRootMenus(rootMenuName, false);
        }, 0);
      }
    }
    this.setState({
      menusHasItems: item.state.open
    });
  };

  public handleMenuItemsNestedListToggle = (item: any) => {
    if (!this.state.isMobileBrowser) {
      if (item.props.open) {
        this.props.actions.animateMenus(item.props['data-id'], true);
        setTimeout(() => {
          this.props.actions.toggleMenus(item.props['data-id']);
        }, 100);
      } else {
        this.props.actions.toggleMenus(item.props['data-id']);
        setTimeout(() => {
          this.props.actions.animateMenus(item.props['data-id'], false);
        }, 0);
      }
    }
  };

  public animateMenu(menu: IMenu, child: IMenu) {
    let className = ' hide';

    if ((menu.open && child.animating && !menu.willCloseMenu) || this.state.isMobileBrowser) {
      className = '';
    }
    return className;
  }

  public render() {
    const { styles, isMobileBrowser, animateRootMenu, handleClickMenu } = this.props;

    return (
      <SelectableList
        className={`views-menu${isMobileBrowser ? '' : ' desktop-browser'}`}
        defaultValue={this.props.selectedMenuIndex}
        defaultItem={this.props.selectedMenuItem}
        ref={(selectableList: any) => {
          this.selectableMenuList = selectableList;
        }}
      >
        {this.props.menus.length > 0 ? (
          <ListItem
            value={-1}
            className="menu-text-color"
            primaryText="MENU"
            style={styles.headerItem}
            open={this.state.menusHasItems}
            onNestedListToggle={this.handleMenusNestedListToggle}
            primaryTogglesNestedList={true}
            nestedItems={
              this.props.menus.length > 0
                ? this.props.menus.map(menu => (
                  <ListItem
                    ref={listItem => {
                      this[menu.id] = listItem;
                    }}
                    className={`list-item${animateRootMenu(
                      { open: this.state.menusHasItems },
                      menu
                    )}`}
                    value={menu.index}
                    style={
                      this.props.selectedMenuIndex === menu.index
                        ? styles.selectedMenuListItem
                        : styles.menuItem
                    }
                    primaryText={menu.text}
                    leftIcon={menu.icon}
                    primaryTogglesNestedList={menu.children && menu.children.length > 0}
                    // tslint:disable-next-line jsx-no-lambda
                    onClick={() => handleClickMenu(menu)}
                    onNestedListToggle={this.handleMenuItemsNestedListToggle}
                    open={menu.open}
                    data-id={menu.id}
                    data-url={menu.url}
                    nestedItems={
                      menu.children && menu.children.length > 0
                        ? menu.children.map(child => (
                          <ListItem
                            className={`list-item${this.animateMenu(menu, child)}`}
                            value={child.index}
                            style={
                              this.props.selectedMenuIndex === child.index
                                ? styles.selectedMenuListItem
                                : styles.menuItem
                            }
                            primaryText={child.text}
                            // tslint:disable-next-line jsx-no-lambda
                            onClick={() => handleClickMenu(child)}
                            data-id={child.id}
                            data-url={child.url}
                          />
                        ))
                        : []
                    }
                  />
                ))
                : []
            }
          />
        ) : (
            <span style={styles.loading}>Loading...</span>
          )}
      </SelectableList>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  menus: (state: IRootState) => state.layout.menus,
  selectedMenuIndex: (state: IRootState) => state.layout.selectedMenuIndex,
  selectedMenuItem: (state: IRootState) => state.layout.selectedMenuItem,

});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(layoutActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
