import * as React from "react";
import { noop } from "lodash";

interface IProps {
  children?: any;
  isActive: boolean;
  styleNameFactory: any;
  onClick?: any;
}

export default class Tab extends React.PureComponent {
  public static defaultProps = {
    children: null,
    onClick: noop
  };

  public props: IProps;

  public render() {
    const { isActive, children, styleNameFactory, onClick } = this.props;
    return (
      <button
        type="button"
        {...styleNameFactory("tab", { active: isActive })}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
