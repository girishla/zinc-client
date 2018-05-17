import getMuiTheme from "material-ui/styles/getMuiTheme";

const themeLight = getMuiTheme({
  palette: {},
  appBar: {
    height: 57,
    color: "#ececec"
  },
  textField: {
    focusColor: "#7144b7"
  },
  drawer: {
    width: 230,
    color: "#f3f3f3"
  },
  raisedButton: {
    primaryColor: "#7144b7"
  },
  checkbox: {
    checkedColor: "#7144b7"
  },
  tabs: {
    backgroundColor: "#ececec",
    textColor: "#717171",
    selectedTextColor: "#717171"
  },
  inkBar: {
    backgroundColor: "#7144b7"
  }
});

// let themeLight = getMuiTheme(darkBaseTheme);

export default themeLight;
