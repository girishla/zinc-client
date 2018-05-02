import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import { ITheme } from '../../theming/theme';


const styles: any = (currentTheme: ITheme) => ({
  avatar: {
    div: {
      height: 45,
      padding: '15px 0 20px 15px',
    },
    icon: {
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
      display: 'block',
      float: 'left',
      marginRight: 15,
    },

    span: {
      color: currentTheme.avatarSpanColor,
      display: 'block',
      fontWeight: 300,
      paddingTop: 12,
      textShadow: currentTheme.avatarSpanTextShadow,
    },
  },
  headerItem: {
    backgroundColor: currentTheme.headerItemBackgroundColor,
    boxShadow: currentTheme.headerItemBoxShadow,
    color: currentTheme.headerItemColor,
    fontSize: 14,
    fontWeight: currentTheme.headerItemFontWeight,
  },
  loading: {
    color: currentTheme.menuItemColor,
    display: 'block',
    fontWeight: 300,
    paddingTop: 12,
    textAlign: 'center',
    textShadow: currentTheme.avatarSpanTextShadow,
  },
  logo: {
    backgroundColor: currentTheme.logoBackgroundColor,
    color: currentTheme.logoColor,
    fontSize: 22,
    fontWeight: typography.fontWeightMedium,
    height: 56,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    textAlign: 'center'
    // paddingLeft: 35,
  },
  selectedListItem: {
    background: currentTheme.selectedListItemBackgroundColor,
    color: currentTheme.selectedListItemColor,
    fontSize: 14,
  },
  selectedMenuListItem: {
    background: currentTheme.selectedMenuListItemBackgroundColor,
    color: currentTheme.selectedMenuListItemColor,
    fontSize: 14,
  },

  menuItem: {
    color: currentTheme.menuItemColor,
    fontSize: 14,
  },

});


export default styles;
