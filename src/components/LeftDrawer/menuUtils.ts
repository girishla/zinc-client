import { IMenu } from "../../containers/Layout/menu";

const findMenuItem = (menus: IMenu[], key: string, value: string) => {
  let foundMenuItem!: IMenu;;
  let foundMenuItemIndex = 0;

  menus.forEach((menu: IMenu, index: number) => {
    if (menu[key] === value) {
      foundMenuItem = menu;
      foundMenuItemIndex += index;
    }
    if (menu.children) {
      menu.children.forEach((child, childIndex) => {
        if (child[key] === value) {
          foundMenuItem = child;
          foundMenuItemIndex += index + childIndex;
        }
      });
    }
    if (menu.children && menu.open && !foundMenuItem) {
      foundMenuItemIndex += (index + (menu.children.length));
    }
  });

  return { foundMenuItem, foundMenuItemIndex };
};

const findParentMenuItem = (menus: IMenu[], childToSearch: IMenu) => {
  let foundMenuItem;

  menus.forEach((menu) => {
    if (menu.children) {
      menu.children.forEach((child) => {
        if (childToSearch === child) {
          foundMenuItem = menu;
        }
      });
    }
  });
  return foundMenuItem;
};

const scrollOpenViews = (menuItem: IMenu, openViews: IMenu[]) => {
  const openMenuElement = document.querySelector('.open-views-menu > div > div');
  if (openMenuElement) {
    const { foundMenuItemIndex } = findMenuItem(openViews, 'url', menuItem.url);
    openMenuElement.scrollTop = (foundMenuItemIndex) * 48;
  }
};

const scrollMenu = (menuItem: IMenu, menus: IMenu[]) => {
  const menuElement = document.querySelector('.views-menu > div > div');
  if (menuElement) {
    const { foundMenuItemIndex } = findMenuItem(menus, 'url', menuItem.url);
    menuElement.scrollTop = foundMenuItemIndex * 48;
  }
};

const scrollToOpenViewsItem = (menuItem: IMenu, openViews: IMenu[]) => {
  setTimeout(() => {
    scrollOpenViews(menuItem, openViews);
  }, 300);
};

const scrollToMenuItem = (menuItem: IMenu, menus: IMenu[]) => {
  setTimeout(() => {
    scrollMenu(menuItem, menus);
  }, 300);
};

const scrollToMenuItemAndOpenViews = (menuItem: IMenu, menus: IMenu[], openViews: IMenu[]) => {
  setTimeout(() => {
    scrollOpenViews(menuItem, openViews);
    scrollMenu(menuItem, menus);
  }, 300);
};

export {
  findMenuItem,
  findParentMenuItem,
  scrollToMenuItem,
  scrollToOpenViewsItem,
  scrollToMenuItemAndOpenViews,
};
