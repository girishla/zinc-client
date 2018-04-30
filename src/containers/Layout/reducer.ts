import { getType } from "typesafe-actions";
import { layoutActions } from "./actions";
// import { IRootState } from "../../IRootState";
import { IMenu } from "./menu";

export const initialState: any = {
  menus: [],
  openViews: [],
  selectedMenuIndex: 0,
  selectedMenuItem: null,
  selectedOpenedMenuIndex: 0,
  selectedOpenedMenuItem: null,
  currentTheme: 'lightTheme', // darkTheme, lightTheme, blueTheme, grayTheme, darkBlueTheme
  openSettingDrawer: false,
  showTabs: false,
  showOpenViews: false,
  isBoxedLayout: false,
};

function setBodyBackground(currentTheme: string) {
  const body: HTMLBodyElement | null = document.querySelector('body');

  switch (currentTheme) {
    case 'darkTheme':
      body!.style.backgroundColor = '#37474f';
      break;
    case 'lightTheme':
      body!.style.backgroundColor = '#eee';
      break;
    case 'blueTheme':
      body!.style.backgroundColor = '#3e6e99';
      break;
    case 'grayTheme':
      body!.style.backgroundColor = '#575f6a';
      break;
    case 'darkBlueTheme':
      body!.style.backgroundColor = '#303a47';
      break;
    default:
      body!.style.backgroundColor = 'white';
      break;
  }
}

function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case getType(layoutActions.changeLayout): {
      const currentTheme = state.currentTheme
      setBodyBackground(currentTheme);

      return Object.assign({}, state, { isBoxedLayout: action.isBoxedLayout })
    }
    case getType(layoutActions.changeTheme): {
      setBodyBackground((action).theme);
      return Object.assign({}, state, { currentTheme: action.theme })
    }
    case getType(layoutActions.changeShowTabs):
      return Object.assign({}, state, { showTabs: action.value })

    case getType(layoutActions.changeShowOpenViews):
      return Object.assign({}, state, { showOpenViews: action.value })


    case getType(layoutActions.loadMenuSuccess): {
      const data = action.data;

      return Object.assign({}, state,
        { menus: data.menus, openViews: data.openViews, selectedMenuItem: data.selectedMenuItem, selectedOpenedMenuItem: data.selectedOpenedMenuItem })


    }
    case getType(layoutActions.openView): {
      const openViews = state.openViews;

      if (openViews.indexOf(action.menuItem) === -1) {
        openViews.push(action.menuItem);
        return Object.assign({}, state, { openViews })

      }
      return state;
    }
    case getType(layoutActions.closeView): {
      const menus1: IMenu[] = state.menus;
      const openViews = Object.assign([], state.openViews);

      let itemFound: IMenu | undefined = openViews.find((item: IMenu) => item.id === action.id);

      const indexToBeRemoved = openViews.indexOf(itemFound!);
      let openedIndex = 0;

      if (indexToBeRemoved > 0) {
        openedIndex = indexToBeRemoved - 1;
      }

      const itemOpenedFound: IMenu | undefined = openViews[openedIndex];
      let menuIndex;

      menus1.forEach((menu: IMenu) => {
        if (itemOpenedFound!.id === menu.id) {
          itemFound = menu;
          menuIndex = menu.index;
        }
        if (menu.children) {
          menu.children.forEach(child => {
            if (itemOpenedFound!.id === child.id) {
              itemFound = child;
              menuIndex = child.index;
            }
          });
        }
      });

      openViews.splice(indexToBeRemoved, 1);


      return Object.assign({}, state, {
        openViews,
        selectedMenuIndex: menuIndex,
        selectedMenuItem: openedIndex,
        selectedOpenedMenuIndex: openedIndex,
        selectedOpenedMenuItem: itemOpenedFound
      });

    }
    case getType(layoutActions.selectMenuItem): {

      // tslint:disable-next-line no-console
      console.log("state", state);
      const menusArr = state.menus;
      const openViews = state.openViews;

      let itemFound: IMenu;
      let index: number;

      menusArr.forEach((menu: IMenu) => {
        if (action.id === menu.id) {
          itemFound = menu;
          index = menu.index;
        }
        if (menu.children) {
          menu.children.forEach((child: IMenu) => {
            if (action.id === child.id) {
              itemFound = child;
              itemFound.icon = menu.icon;
              index = child.index;
            }
          });
        }
      });

      let itemOpenedFound = openViews.find((item: IMenu) => item && itemFound && (item.id === itemFound.id));

      let openedIndex = 0;

      if (!itemOpenedFound) {
        itemOpenedFound = Object.assign({}, itemFound!);
        openedIndex = openViews.length;
      } else {
        openedIndex = openViews.indexOf(itemOpenedFound);
      }

      return Object.assign({}, state, {
        selectedMenuIndex: index!,
        selectedMenuItem: itemFound!,
        selectedOpenedMenuIndex: openedIndex,
        selectedOpenedMenuItem: itemOpenedFound
      })


    }
    case getType(layoutActions.openSettingsDrawer):
      return Object.assign({}, state, { openSettingDrawer: true })
    case getType(layoutActions.closeSettingsDrawer):
      return Object.assign({}, state, { openSettingDrawer: false })
    case getType(layoutActions.animateMenus):
      let menus = state.menus;

      menus = menus.map((item: IMenu) => {
        let newItem: IMenu = item;

        if (item.children && item.children.length > 0) {
          if (item.id === action.menuId) {
            newItem = { ...item, animating: true, willCloseMenu: action.willCloseMenu };
          } else {
            newItem = { ...item, animating: false };
          }

          newItem.children = newItem.children.map(child => {
            let newChild = child;
            newChild = {
              ...child,
              animating: newItem.animating,
              willCloseMenu: newItem.willCloseMenu
            };
            return newChild;
          });
        }

        return newItem;
      });

      return Object.assign({}, state, { menus });

    case getType(layoutActions.toggleMenus): {
      let menusArr = state.menus;

      menusArr = menusArr.map((item: IMenu) => {
        let newItem = item;

        if (item.children && item.children.length > 0) {
          if (item.id === action.menuId) {
            newItem = { ...item, open: !item.open, animating: false };
          } else {
            newItem = { ...item, open: false, animating: false };
          }
        }

        return newItem;
      });
      return Object.assign({}, state, { menus });

    }
    case getType(layoutActions.animateRootMenus): {
      let menusArr = state[action.rootMenuName];

      menusArr = menusArr.map((item: IMenu) => {
        let newItem = item;

        newItem = { ...item, animatingRootMenu: true, willCloseRootMenu: action.willCloseMenu };

        return newItem;
      });

      return Object.assign({}, state, {}[action.rootMenuName] = menus);

    }
    case getType(layoutActions.toggleRootMenus): {
      let menusArr = state[action.rootMenuName];

      menusArr = menusArr.map((item: IMenu) => {
        let newItem = item;

        newItem = { ...item, animatingRootMenu: false };

        return newItem;
      });
      return Object.assign({}, state, {}[action.rootMenuName] = menus);
    }
    default:
      return state;
  }
}

export default appReducer;
