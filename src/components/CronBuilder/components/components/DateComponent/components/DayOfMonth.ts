import { PureComponent } from "react";
import { toOptions } from "../../../../utils";
import { range } from "lodash";

const options = [
  {
    label: "every month day",
    value: "*"
  }
].concat(toOptions(range(1, 32)));

export default class DayOfMonth extends PureComponent<{
  value: any;
  onChange: any;
}> {
  public static className: string = "DayOfMonth";
  public static getOptions() {
    return options;
  }
}
