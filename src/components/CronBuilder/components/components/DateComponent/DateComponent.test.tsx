import * as React from "react";
import { EVERY } from "../../../data/constants";
import { mount, configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Select from "react-select";
import { getValues } from "../../../utils";
import DateComponent, { DayOfWeek, DayOfMonth, Month } from "./index";

// configure enzyme
configure({ adapter: new Adapter() });

describe("DateComponent", () => {
  class Wrapper extends React.Component {
    public dateComponent: any;
    public state = {
      dow: EVERY,
      dom: EVERY,
      month: EVERY
    };

    public onChange = (field: string) => {
      return (value: string[]) => {
        this.setState({
          [field]: value
        });
      };
    };

    public render() {
      const { dow, dom, month } = this.state;
      return (
        <DateComponent
          ref={el => (this.dateComponent = el)}
          styleNameFactory={jest.fn()}
        >
          <DayOfWeek value={dow} onChange={this.onChange("dow")} />
          <DayOfMonth value={dom} onChange={this.onChange("dom")} />
          <Month value={month} onChange={this.onChange("month")} />
        </DateComponent>
      );
    }
  }

  it("initial rendering", () => {
    const wrapper = mount(<Wrapper />);
    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find("select")).toHaveLength(1);
  });

  it("should switch components", () => {
    const wrapper = mount(<Wrapper />);
    wrapper.find("select").simulate("click");
    expect(wrapper.find("option")).toHaveLength(3);
    wrapper.find("select").simulate("change", {
      target: {
        value: DayOfMonth
      }
    });
    expect(
      (wrapper.instance() as Wrapper).dateComponent.state.activeComponent
    ).toEqual(DayOfMonth);
    wrapper.find("select").simulate("change", {
      target: {
        value: Month
      }
    });
    expect(
      (wrapper.instance() as Wrapper).dateComponent.state.activeComponent
    ).toEqual(Month);
  });

  xit("should toggle every and other values", () => {
    const wrapper = mount(<Wrapper />);

    const components = [DayOfWeek, DayOfMonth, Month];
    const onChangeComponent: any = wrapper.find("select").props().onChange;
    const changeComponent = (component: any) =>
      onChangeComponent({
        target: {
          value: component.className
        }
      });
    for (let i = 0; i < 3; i++) {
      changeComponent(components[i]);
      const input = wrapper.find(Select);
      const { options, onChange }: any = input.props();

      const expectedOptions = [options[2], options[3]];
      onChange([options[0]].concat(expectedOptions));
      const keys = Object.keys(wrapper.state());
      console.log("keys" + keys);
      console.log(wrapper.state());

      const key = keys[i];
      console.log(
        components[i].className +
          " ^^^   " +
          key +
          wrapper.state()[key] +
          "       " +
          getValues(expectedOptions)
      );
      expect(wrapper.state()[key]).toEqual(getValues(expectedOptions));
      onChange(expectedOptions.concat([options[0]]));
      expect(wrapper.state()[key]).toEqual([EVERY]);
      onChange(expectedOptions);
      expect(wrapper.state()[key]).toEqual(getValues(expectedOptions));
    }
  });
});
