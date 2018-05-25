import * as React from "react";
// import Paper from "material-ui/Paper";
// import FontIcon from "material-ui/FontIcon";
import { white, grey200 } from "material-ui/styles/colors";
import typography from "material-ui/styles/typography";
// import Theme from "src/theming/theme";

interface IDashboardInfoBox {
  Icon: any;
  iconColor: string;
  color: string;
  title: string;
  value: string;
}

class DashboardInfoBox extends React.Component<IDashboardInfoBox> {
  // eslint-disable-line react/prefer-stateless-function
  public render() {
    const { color, title, value, iconColor } = this.props;

    const styles: any = {
      container: {
        backgroundColor: color
      },
      content: {
        padding: "10px 10px",
        marginLeft: 0,
        textAlign: "center",
        height: 50,
        zIndex: 1,
        position: "relative"
      },
      number: {
        marginTop: 5,
        marginBottom: 3,
        display: "block",
        fontWeight: (typography as any).fontWeight,
        fontSize: 20,
        color: white
      },
      text: {
        fontSize: 13,
        fontWeight: typography.fontWeightLight,
        color: grey200
      },
      iconSpan: {
        float: "left",
        height: 90,
        width: 90,
        textAlign: "center",
        backgroundColor: color,
        position: "absolute",
        zIndex: 0
      },
      icon: {
        height: 96,
        width: 96,
        fontSize: 96,
        bottom: 0,
        position: "absolute",
        left: 0,
        fill: iconColor
      }
    };

    return (
      <div style={styles.container}>
        {/* <span style={styles.iconSpan}>
          <FontIcon
            color={iconColor}
            style={styles.icon}
            className="material-icons"
          >
            {Icon}
          </FontIcon>
        </span> */}

        <div style={styles.content}>
          <span style={styles.number}>{value}</span>
          <span style={styles.text}>{title}</span>
        </div>
      </div>
    );
  }
}

export default DashboardInfoBox;
