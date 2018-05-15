import * as React from "react";
import { If, Then, Else } from "react-if";
import { MINUTES } from "../data/constants";
import {
  isMultiple,
  toggleDateType,
  toOptions,
  rangeHoursToSingle
} from "../utils";
import { range } from "lodash";
import MultipleSwitcher from "./MultipleSwitcher";
import TimeInput from "./components/TimeInput";
import DateComponent, {
  DayOfWeek,
  DayOfMonth,
  Month
} from "./components/DateComponent";
import PresetTab from "./PresetTab";
import { IPresetTabState } from "./types/IPresetTabState";
import { IPresetTabProps } from "./types/IPresetTabProps";

const minutesOptions = toOptions(range(1, 60));
const hoursOptions = toOptions(range(0, 24));

const isMinutes = (activeTime: string) => activeTime === MINUTES;

const timeInputProps = { style: { minWidth: 75 } };

export default class PeriodicallyTab extends PresetTab {
  constructor(props: IPresetTabProps, ctx: {}) {
    super(props, ctx);
    const { hours } = this.state;
    this.state.hours = rangeHoursToSingle(hours);
  }

  public toggleActiveTime = () => {
    this.setState(({ activeTime }: IPresetTabState) => ({
      activeTime: toggleDateType(activeTime)
    }));
  };

  public isMultiple = () => {
    const { activeTime, minutesMultiple, hoursMultiple } = this.state;
    if (activeTime === MINUTES) {
      return minutesMultiple;
    } else {
      return hoursMultiple;
    }
  };

  public render() {
    const { styleNameFactory } = this.props;
    const {
      activeTime,
      minutes,
      hours,
      dayOfWeek,
      dayOfMonth,
      month
    } = this.state;
    return (
      <div {...styleNameFactory("preset")}>
        <div>
          <MultipleSwitcher
            styleNameFactory={styleNameFactory}
            isMultiple={this.isMultiple()}
            onChange={this.changeDateType}
          />
          <div {...styleNameFactory("row", "main")}>
            <If condition={isMinutes(activeTime)}>
              <Then>
                <TimeInput
                  options={minutesOptions}
                  value={minutes}
                  styleNameFactory={styleNameFactory}
                  onChange={this.selectMinutes}
                  multi={isMultiple(minutes)}
                  {...timeInputProps}
                />
              </Then>
              <Else>
                <TimeInput
                  options={hoursOptions}
                  value={hours}
                  styleNameFactory={styleNameFactory}
                  multi={isMultiple(hours)}
                  onChange={this.selectHours}
                  {...timeInputProps}
                />
              </Else>
            </If>
            <div style={{ width: 150 }}>
              <MultipleSwitcher
                styleNameFactory={styleNameFactory}
                isMultiple={!isMinutes(activeTime)}
                onChange={this.toggleActiveTime}
                single="minutes"
                multiple="hours"
              />
            </div>
          </div>
        </div>
        <DateComponent styleNameFactory={styleNameFactory}>
          <DayOfWeek value={dayOfWeek} onChange={this.selectDayOfWeek} />
          <DayOfMonth value={dayOfMonth} onChange={this.selectDayOfMonth} />
          <Month value={month} onChange={this.selectMonth} />
        </DateComponent>
      </div>
    );
  }
}
