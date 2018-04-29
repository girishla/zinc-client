import { ITheme } from "../../theming/theme";

const styles: any = (isBoxedLayout: boolean, currentTheme: ITheme) => ({
  appBar: {
    maxHeight: 57,
    maxWidth: isBoxedLayout ? 1200 : null,
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
  },
  iconButton: {
    fill: currentTheme.appBarMenuButtonColor,
  },
  iconsRightContainer: {
    marginLeft: 20,
  },
  menuButton: {
    marginLeft: 10,
  },
  tabsScrollbars: {
    overflowX: 'overlay',
    overflowY: 'hidden',
  },

});

export default styles;
