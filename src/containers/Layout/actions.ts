import { createAction } from "typesafe-actions";
import { IMenu } from "./menu";

/*
 * Layout Constants
 * */

export const DEFAULT_LOCALE = "en";
export const LOAD_MENU = "zinc/layout/LOAD_MENU";
export const LOAD_MENU_SUCCESS = "zinc/layout/LOAD_MENU_SUCCESS";
export const LOAD_MENU_FAILED = "zinc/layout/LOAD_MENU_FAILED";
export const OPEN_VIEW = "zinc/layout/OPEN_VIEW";
export const CLOSE_VIEW = "zinc/layout/CLOSE_VIEW";
export const SELECT_MENU_ITEM = "zinc/layout/SELECT_MENU_ITEM";

export const OPEN_SETTING_DRAWER = "zinc/layout/OPEN_SETTING_DRAWER";
export const CLOSE_SETTING_DRAWER = "zinc/layout/CLOSE_SETTING_DRAWER";
export const CHANGE_THEME = "zinc/layout/CHANGE_THEME";
export const ANIMATE_MENUS = "zinc/layout/ANIMATE_MENUS";
export const TOGGLE_MENUS = "zinc/layout/TOGGLE_MENUS";
export const ANIMATE_ROOT_MENUS = "zinc/layout/ANIMATE_ROOT_MENUS";
export const TOGGLE_ROOT_MENUS = "zinc/layout/TOGGLE_ROOT_MENUS";
export const CHANGE_SHOWS_TABS = "zinc/layout/CHANGE_SHOWS_TABS";
export const CHANGE_SHOW_OPEN_VIEWS = "zinc/layout/CHANGE_SHOW_OPEN_VIEWS";
export const CHANGE_LAYOUT = "zinc/layout/CHANGE_LAYOUT";
export const SHOW_SNACKBAR_MESSAGE = "zinc/layout/SHOW_SNACKBAR_MESSAGE";
export const HIDE_SNACKBAR_MESSAGE = "zinc/layout/HIDE_SNACKBAR_MESSAGE";

export const SHOW_MODAL_DIALOG = "zinc/layout/SHOW_MODAL_DIALOG";
export const MODAL_DIALOG_CANCEL_ACTION =
  "zinc/layout/MODAL_DIALOG_CANCEL_ACTION";
export const MODAL_DIALOG_OK_ACTION = "zinc/layout/MODAL_DIALOG_OK_ACTION";

export const layoutActions = {
  changeLayout: createAction(CHANGE_LAYOUT, (isBoxedLayout: boolean) => ({
    isBoxedLayout,
    type: CHANGE_LAYOUT
  })),
  openView: createAction(OPEN_VIEW, (menuItem: IMenu) => ({
    menuItem,
    type: OPEN_VIEW
  })),
  closeView: createAction(CLOSE_VIEW, (menuId: string) => ({
    type: CLOSE_VIEW,
    menuId
  })),

  selectMenuItem: createAction(SELECT_MENU_ITEM, (menuId: string) => ({
    type: SELECT_MENU_ITEM,
    menuId
  })),
  loadMenuSuccess: createAction(LOAD_MENU_SUCCESS, data => ({
    type: LOAD_MENU_SUCCESS,
    data
  })),
  loadMenu: createAction(LOAD_MENU),
  openSettingsDrawer: createAction(OPEN_SETTING_DRAWER),
  closeSettingsDrawer: createAction(CLOSE_SETTING_DRAWER),

  changeTheme: createAction(CHANGE_THEME, theme => ({
    type: CHANGE_THEME,
    theme
  })),

  changeShowTabs: createAction(CHANGE_SHOWS_TABS, value => ({
    type: CHANGE_SHOWS_TABS,
    value
  })),

  changeShowOpenViews: createAction(CHANGE_SHOW_OPEN_VIEWS, value => ({
    type: CHANGE_SHOW_OPEN_VIEWS,
    value
  })),

  animateMenus: createAction(
    ANIMATE_MENUS,
    (menuId: number, willCloseMenu: boolean) => ({
      type: ANIMATE_MENUS,
      menuId,
      willCloseMenu
    })
  ),

  toggleMenus: createAction(TOGGLE_MENUS, (menuId: number) => ({
    type: TOGGLE_MENUS,
    menuId
  })),

  animateRootMenus: createAction(
    ANIMATE_ROOT_MENUS,
    (rootMenuName: string, willCloseRootMenu: boolean) => ({
      type: ANIMATE_ROOT_MENUS,
      rootMenuName,
      willCloseRootMenu
    })
  ),

  toggleRootMenus: createAction(TOGGLE_ROOT_MENUS, (rootMenuName: string) => ({
    type: TOGGLE_ROOT_MENUS,
    rootMenuName
  })),

  showSnackBarMessage: createAction(
    SHOW_SNACKBAR_MESSAGE,
    (message: string) => ({
      type: SHOW_SNACKBAR_MESSAGE,
      message
    })
  ),
  hideSnackBarMessage: createAction(HIDE_SNACKBAR_MESSAGE),
  showModalDialog: createAction(
    SHOW_MODAL_DIALOG,
    (
      okActionName: any,
      onModalOk: any,
      modalContent: any,
      modalTitle: any,
      modalData: any
    ) => ({
      type: SHOW_MODAL_DIALOG,
      okActionName,
      onModalOk,
      modalContent,
      modalTitle,
      modalData
    })
  ),
  modalDialogOk: createAction(MODAL_DIALOG_OK_ACTION),
  modalDialogCancel: createAction(MODAL_DIALOG_CANCEL_ACTION)
};
