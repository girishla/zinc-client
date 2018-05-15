import { IOption } from "../types/Option";
import { ICronExpression } from "../types/CronExpression";

import { head } from "lodash";
import { values } from "lodash";
import { get } from "lodash";
import { MINUTES, HOURS, EVERY } from "../data/constants";

export const toggleMultiple = (value: any) => {
  if (value instanceof Array) {
    return head(value);
  } else {
    return [value];
  }
};

export const toOptions = (vals: any[]) => {
  return vals.map(String).map((value: string) => ({
    value,
    label: value
  }));
};

export const toggleDateType = (value: string) => {
  return value === MINUTES ? HOURS : MINUTES;
};

export const parseTimeValue = (value: any): any => {
  if (value instanceof Array) {
    return value.map(parseTimeValue);
  }
  switch (value) {
    case "*":
      return "1";
    default:
      return value;
  }
};

export const isMultiple = (value: any) => value instanceof Array;

export const ensureMultiple = (value: any, multiple: boolean) => {
  if (multiple && !isMultiple(value)) {
    return toggleMultiple(value);
  }
  if (!multiple && isMultiple(value)) {
    return toggleMultiple(value);
  }
  return value;
};

export const getValues = (value: IOption[]) =>
  value.map((option: IOption) => option.value);

export const getValue = (value: any) => {
  return get(value, "value") || value;
};

export const generateCronExpression = (expression: ICronExpression) => {
  return values(expression).join(" ");
};

export const splitMultiple = (
  value: string,
  field: string | undefined = undefined
) => {
  if (value.includes(",")) {
    return value.split(",");
  }
  if (value.includes("/")) {
    return value;
  }
  if (value.includes("-") && field === HOURS) {
    return value;
  }
  if (value === EVERY) {
    return value;
  }
  return [value];
};

export const replaceEvery = (value: any) => {
  if (typeof value === "string") {
    return value.replace("*/", "");
  }
  return value;
};

export const parseCronExpression = (expression: string) => {
  const [minutes, hours, dayOfMonth, month, dayOfWeek] = expression.split(" ");
  const defaultExpression = {
    minutes: EVERY,
    hours: EVERY,
    dayOfMonth: EVERY,
    month: EVERY,
    dayOfWeek: EVERY
  };
  return Object.assign(defaultExpression, {
    minutes: replaceEvery(splitMultiple(minutes)),
    hours: replaceEvery(splitMultiple(hours, HOURS)),
    dayOfMonth: splitMultiple(dayOfMonth),
    month: splitMultiple(month),
    dayOfWeek: splitMultiple(dayOfWeek)
  });
};

export const addLeadingZero = (el: any) => `0${el}`.slice(-2);

export const addLeadingZeroToOption = (option: IOption) => {
  const { value, label } = option;
  return {
    label: addLeadingZero(label),
    value
  };
};

export const defaultTo = (item: string, defaultItem: string) => {
  return item === EVERY || !item ? defaultItem : item;
};

export const rangeHoursToSingle = (hours: any) => {
  if (hours instanceof Array) {
    return hours;
  }
  return hours.split("-")[0];
};
