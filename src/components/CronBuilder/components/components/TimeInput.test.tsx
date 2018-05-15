import { mount, configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { range } from "lodash";
import { toOptions } from "../../utils";
import Select from "react-select";
import TimeInput from "./TimeInput";

// configure enzyme
configure({ adapter: new Adapter() });

describe("TimeInput", () => {
  const styleNameFactory = jest.fn();

  it("should return array of values on change", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TimeInput
        styleNameFactory={styleNameFactory}
        value="2"
        options={toOptions(range(1, 24))}
        onChange={onChange}
        multi={true}
      />
    );
    (wrapper.find(Select).props() as any).onChange(toOptions([1, 2, 3]));
    expect(onChange).toHaveBeenCalledWith([1, 2, 3].map(String));
  });

  it("should return single value on change", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TimeInput
        styleNameFactory={styleNameFactory}
        value="2"
        options={toOptions(range(1, 24))}
        onChange={onChange}
      />
    );
    (wrapper.find(Select).props() as any).onChange(toOptions([1])[0]);
    expect(onChange).toHaveBeenCalledWith("1");
  });
});
