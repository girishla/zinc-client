import * as React from "react";
import { pick } from "lodash";
import { MINUTES, EVERY } from "../data/constants";
import { isMultiple, ensureMultiple, replaceEvery } from "../utils";
import { IPresetTabState } from "./types/IPresetTabState";
import { IPresetTabProps } from "./types/IPresetTabProps";

export const ensureEveryOn = (value: any, multiple: boolean) => {
  const process = (item: any) => {
    if (item === EVERY) {
      return item;
    }
    if (item.includes("-")) {
      return item;
    }
    if (multiple && item.includes("/")) {
      return replaceEvery(item);
    }
    if (!multiple && !item.includes("/")) {
      return `*/${item}`;
    }
    return item;
  };
  if (value instanceof Array) {
    return value.map(process);
  } else {
    return process(value);
  }
};

export default class PresetTab extends React.PureComponent {
  public props: IPresetTabProps;

  public state: IPresetTabState;

  constructor(props: IPresetTabProps, ctx: {}) {
    super(props, ctx);
    const { expression } = props;
    const { minutes, hours } = expression;
    const minutesMultiple = isMultiple(minutes);
    const hoursMultiple = isMultiple(hours);
    this.state = {
      ...expression,
      activeTime: MINUTES,
      minutesMultiple,
      hoursMultiple,
      minutes,
      hours
    };
  }
  public selectMinutes = (value: string) => {
    this.setState({
      minutes: value
    });
  };

  public selectHours = (value: string) => {
    this.setState({
      hours: value
    });
  };

  public selectDayOfWeek = (value: string) => {
    this.setState({
      dayOfWeek: value
    });
  };

  public selectDayOfMonth = (value: string) => {
    this.setState({
      dayOfMonth: value
    });
  };

  public selectMonth = (value: string) => {
    this.setState({
      month: value
    });
  };

  public changeDateType = () => {
    const { state } = this;
    const { activeTime } = state;
    const field = activeTime.toLowerCase();
    const key = `${field}Multiple`;
    const value = !this.state[key];
    this.setState({
      [key]: value,
      [field]: ensureMultiple(state[field], value)
    });
  };

  public getExpression() {
    const { state } = this;
    const { minutes, hours, minutesMultiple, hoursMultiple } = state;
    return {
      minutes: ensureEveryOn(minutes, minutesMultiple),
      hours: ensureEveryOn(hours, hoursMultiple),
      ...pick(state, ["dayOfMonth", "month", "dayOfWeek"])
    };
  }
}
