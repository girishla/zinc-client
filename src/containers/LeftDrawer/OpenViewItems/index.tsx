import FontIcon from 'material-ui/FontIcon';
import { ListItem } from 'material-ui/List';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { layoutActions } from '../../../containers/Layout/actions';
import { IMenu } from '../../../containers/Layout/menu';
import { IRootState } from '../../../IRootState';

import SelectableList from '../../../components/SelectableList';

interface IOpenViewItemsProps {
  selectedOpenedMenuIndex: number;
  showOpenViews: boolean;
  isBoxedLayout: boolean;
  handleClickMenu: any;
  styles: any;
  openViews: IMenu[];
  isMobileBrowser: boolean;
  animateRootMenu: any;
  selectedOpenedMenuItem: IMenu;
  actions: typeof layoutActions;

}

interface IOpenViewItemsState {
  openViewsHasItems: boolean;
  isMobileBrowser: boolean;
  // menusHasItems: boolean;
}

class OpenViewItems extends React.Component<IOpenViewItemsProps, IOpenViewItemsState> {
  public selectableOpenViewList: any;

  constructor(props: IOpenViewItemsProps) {
    super(props);

    this.state = {
      isMobileBrowser: false,
      openViewsHasItems: true,
    };

    this.handleOpenViewNestedListToggle = this.handleOpenViewNestedListToggle.bind(this);
  }

  public componentWillReceiveProps(newProps: IOpenViewItemsProps) {
    if (
      newProps.selectedOpenedMenuIndex !== this.props.selectedOpenedMenuIndex &&
      this.props.showOpenViews
    ) {
      this.selectableOpenViewList.setSelectedIndex(newProps.selectedOpenedMenuIndex);
    }
  }

  public handleOpenViewNestedListToggle = (item: any) => {
    if (!this.state.isMobileBrowser) {
      const rootMenuName = 'openViews';
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
      openViewsHasItems: item.state.open
    });
  };

  public handleClickOpenViews(menuItem: IMenu, event: any) {
    const x = event.pageX - event.currentTarget.offsetLeft;
    const y = event.pageY - event.currentTarget.getBoundingClientRect().top;
    const id = event.currentTarget.getAttribute('data-id');
    let minX = 188;
    let maxX = 215;
    const minY = 16;
    const maxY = 31;

    if (this.props.isBoxedLayout) {
      minX = 541;
      maxX = 567;
    }

    if (x > minX && x < maxX && y > minY && y < maxY && id && id !== 'dashboard') {
      this.props.actions.closeView(id);
    } else {
      this.props.handleClickMenu(menuItem);
    }
  }

  public render() {
    const { styles, isMobileBrowser, animateRootMenu } = this.props;

    return (
      <SelectableList
        className={`open-views-menu${
          this.props.openViews.length > 0 &&
            this.props.openViews[0].animatingRootMenu
            ? ' animating'
            : ''
          }`}
        defaultValue={this.props.selectedOpenedMenuIndex}
        defaultItem={this.props.selectedOpenedMenuItem}
        ref={(selectableList: any) => {
          this.selectableOpenViewList = selectableList;
        }}
      >
        <ListItem
          value={-1}
          className="menu-text-color"
          primaryText="OPEN VIEWS"
          style={styles.headerItem}
          open={this.state.openViewsHasItems}
          onNestedListToggle={this.handleOpenViewNestedListToggle}
          primaryTogglesNestedList={true}
          nestedItems={
            this.props.openViews.length > 0
              ? this.props.openViews.map(
                (menu, index) =>
                  menu.id === 'dashboard' ? (
                    <ListItem
                      className={`list-item ${
                        this.props.selectedOpenedMenuIndex === index ? 'selected' : ''
                        }
                  ${animateRootMenu({ open: this.state.openViewsHasItems }, menu)}`}
                      value={index}
                      style={
                        this.props.selectedOpenedMenuIndex === index
                          ? styles.selectedListItem
                          : styles.menuItem
                      }
                      primaryText={menu.text}
                      leftIcon={menu.icon}
                      // tslint:disable-next-line jsx-no-lambda
                      onClick={evt => this.handleClickOpenViews(menu, evt)}
                      containerElement={<Link to={menu.url}>``</Link>}
                    />
                  ) : (
                      <ListItem
                        className={`list-item open-views${
                          isMobileBrowser ? '' : ' desktop-browser'
                          } ${this.props.selectedOpenedMenuIndex === index ? 'selected' : ''}
                  ${animateRootMenu({ open: this.state.openViewsHasItems }, menu)}`}
                        value={index}
                        style={
                          this.props.selectedOpenedMenuIndex === index
                            ? styles.selectedListItem
                            : styles.menuItem
                        }
                        primaryText={menu.text}
                        leftIcon={menu.icon}
                        rightIcon={<FontIcon className="material-icons">close</FontIcon>}
                        // tslint:disable-next-line jsx-no-lambda
                        onClick={evt => this.handleClickOpenViews(menu, evt)}
                        containerElement={<div className="close-tab" />}
                        data-id={menu.id}
                        data-url={menu.url}
                      />
                    )
              )
              : []
          }
        />
      </SelectableList>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  isBoxedLayout: (store: IRootState) => store.layout.isBoxedLayout,
  openViews: (store: IRootState) => store.layout.openViews,
  selectedOpenedMenuIndex: (store: IRootState) => store.layout.selectedOpenedMenuIndex,
  selectedOpenedMenuItem: (store: IRootState) => store.layout.selectedOpenedMenuItem,
  showOpenViews: (store: IRootState) => store.layout.showOpenViews,


});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(layoutActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenViewItems);
