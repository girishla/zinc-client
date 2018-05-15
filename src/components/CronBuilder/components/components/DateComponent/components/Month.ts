import { PureComponent } from "react";

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December"
].map((month: string, i: number) => ({
  label: month,
  value: String(i + 1)
}));

const options = [
  {
    label: "every month",
    value: "*"
  }
].concat(monthOptions);

export default class Month extends PureComponent<{
  value: any;
  onChange: any;
}> {
  public static className: string = "Month";

  public static getOptions() {
    return options;
  }
}
