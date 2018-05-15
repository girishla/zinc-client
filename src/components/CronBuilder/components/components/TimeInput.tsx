import * as React from "react";
import { IOption } from "../../types/Option";
import { parseTimeValue, getValues, getValue } from "../../utils";
import Select from "./Select";

interface IProps {
  value: any;
  options: IOption[];
  styleNameFactory: any;
  onChange: (value: string) => void;
  multi?: any;
}

export default class TimeInput extends React.PureComponent {
  public props: IProps;

  public onChange = (onChange: any) => {
    return (value: any) => {
      if (value instanceof Array) {
        onChange(getValues(value));
      } else {
        onChange(getValue(value));
      }
    };
  };

  public render() {
    const { styleNameFactory, value, onChange } = this.props;
    return (
      <Select
        {...this.props}
        {...styleNameFactory("input")}
        value={parseTimeValue(value)}
        onChange={this.onChange(onChange)}
      />
    );
  }
}
