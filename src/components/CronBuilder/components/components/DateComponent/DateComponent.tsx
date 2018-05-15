import * as React from "react";
import { If, Then } from "react-if";
import { EVERY } from "../../../data/constants";
import { head } from "lodash";
import { IOption } from "../../../types/Option";
import { getValues } from "../../../utils";
import Select from "../Select";
import { DayOfWeek, DayOfMonth, Month } from "./index";

interface IProps {
  styleNameFactory: any;
  children?: any;
}

interface IState {
  activeComponent: any;
}

export default class DateComponent extends React.PureComponent {
  public static defaultProps = {
    children: null
  };

  public state: IState = {
    activeComponent: DayOfWeek.className
  };

  public props: IProps;

  public setActiveComponent = ({ target: { value } }: any) => {
    this.setState({
      activeComponent: value
    });
  };

  public onChange = (onChange: any) => {
    return (value: IOption[]) => {
      const values = getValues(value);
      const first = head(values);
      if (first === EVERY && values.length > 1) {
        onChange(values.filter((val: string) => val !== EVERY));
      } else {
        const everyIndex = values.indexOf(EVERY);
        if (everyIndex !== -1) {
          onChange([EVERY]);
        } else {
          onChange(values);
        }
      }
    };
  };

  public render() {
    const { styleNameFactory, children } = this.props;
    const { activeComponent } = this.state;

    return (
      <div style={{ position: "relative" }}>
        <label {...styleNameFactory("label")}>On:</label>
        <div {...styleNameFactory("row", "items-end")}>
          {React.Children.map(children, (child: any) => {
            const { value, onChange } = child.props;
            const { getOptions } = child.type;
            return (
              <If condition={child.type.className === activeComponent}>
                <Then>
                  <div {...styleNameFactory("input")}>
                    <Select
                      style={{ minWidth: 120 }}
                      value={value}
                      options={getOptions()}
                      multi={true}
                      autosize={true}
                      onChange={this.onChange(onChange)}
                    />
                  </div>
                </Then>
              </If>
            );
          })}
        </div>
        <div style={{ position: "absolute" }} {...styleNameFactory("link")}>
          <select onChange={this.setActiveComponent}>
            <option value={DayOfWeek.className}>day of week</option>
            <option value={DayOfMonth.className}>day of month</option>
            <option value={Month.className}>month</option>
          </select>
        </div>
      </div>
    );
  }
}
