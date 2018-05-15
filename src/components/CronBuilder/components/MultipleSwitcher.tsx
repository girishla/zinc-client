import * as React from "react";
import Tab from "./Tab";

interface IProps {
  styleNameFactory?: any;
  single?: string;
  multiple?: string;
  isMultiple?: boolean;
  onChange?: any;
}

export default class MultipleSwitcher extends React.PureComponent {
  public static defaultProps = {
    single: "Every:",
    multiple: "On:"
  };

  public props: IProps;

  public render() {
    const {
      styleNameFactory,
      single,
      multiple,
      isMultiple,
      onChange
    } = this.props;
    return (
      <div>
        <div
          {...styleNameFactory("row", "inline")}
          onClick={onChange}
          data-multiple-switcher={true}
        >
          <Tab styleNameFactory={styleNameFactory} isActive={!isMultiple}>
            {single}
          </Tab>
          <Tab styleNameFactory={styleNameFactory} isActive={!!isMultiple}>
            {multiple}
          </Tab>
        </div>
      </div>
    );
  }
}
