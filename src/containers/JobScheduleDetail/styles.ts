import { ITheme } from "../../theming/theme";

const styles = (theme: ITheme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  textField: {
    // marginLeft: 50,
    marginRight: 50,
    width: 200
  }
});
export default styles;
