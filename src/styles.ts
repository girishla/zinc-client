import typography from 'material-ui/styles/typography';
import { grey600 } from 'material-ui/styles/colors';

const styles: any = {
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightMedium,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightMedium,
    marginBottom: 20
  },
  paper: {
    padding: 30
  },
  clear: {
    clear: 'both'
  },
  pageBaseContent: {
    height: '100%',
    minHeight: 500
  }
};

export default styles;
