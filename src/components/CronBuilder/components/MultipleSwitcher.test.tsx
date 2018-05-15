import { mount, configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import * as React from "react";
import MultipleSwitcher from "./MultipleSwitcher";
import Tab from "./Tab";

// configure enzyme
configure({ adapter: new Adapter() });

describe("MultipleSwitcher", () => {
  const styleNameFactory = jest.fn();

  it("initial rendering", () => {
    const wrapper = mount(
      <MultipleSwitcher styleNameFactory={styleNameFactory} />
    );
    expect(wrapper.find(Tab)).toHaveLength(2);
  });
});
