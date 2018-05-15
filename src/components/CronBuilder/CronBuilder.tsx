import * as React from "react";
import * as BEMHelper from "react-bem-helper";
import { If, Then } from "react-if";
import { generateCronExpression, parseCronExpression } from "./utils";
import cronsTrue from "cronstrue";
import { noop } from "lodash";
import Tab from "./components/Tab";
import PeriodicallyTab from "./components/PeriodicallyTab";
import PeriodicallyFrameTab from "./components/PeriodicallyFrameTab";
import FixedTimeTab from "./components/FixedTimeTab";

import "./cron-builder.css";

const styleNameFactory = new BEMHelper("cron-builder");

export interface IProps {
  cronExpression?: string;
  showResult?: boolean;
  onChange?: any;
}

export interface IState {
  activeIndex: number;
  Component: any;
  generatedExpression: string;
}

const components = [PeriodicallyTab, PeriodicallyFrameTab, FixedTimeTab];
const getActiveTabIndex = (props: IProps) => {
  const { cronExpression } = props;
  if (cronExpression) {
    const parsedExpression = parseCronExpression(cronExpression);
    if (parsedExpression.hours.includes("-")) {
      return 1;
    } else {
      return 0;
    }
  }
  return 0;
};

export default class CronBuilder extends React.PureComponent {
  public static defaultProps = {
    cronExpression: "* * * * *",
    showResult: true,
    onChange: noop
  };

  public state: IState;

  public props: IProps;

  public presetComponent: any;

  constructor(props: IProps, ctx: {}) {
    super(props, ctx);
    const activeIndex = getActiveTabIndex(props);
    this.state = {
      activeIndex,
      Component: components[activeIndex],
      generatedExpression: ""
    };
  }
  public generateExpression = () => {
    let { onChange }: any = this.props;

    onChange =
      onChange ||
      (() =>
        console.warn(
          "Cron builder - Using Default dummy OnChange function. Please pass a valud Onchange function"
        ));

    this.setState(
      {
        generatedExpression: generateCronExpression(
          this.presetComponent.getExpression()
        )
      },
      () => onChange(this.state.generatedExpression)
    );
  };

  public selectTab = (activeIndex: number) => {
    return () => {
      this.setState({
        activeIndex,
        Component: components[activeIndex]
      });
    };
  };

  public render() {
    const { cronExpression, showResult } = this.props;
    const { activeIndex, Component, generatedExpression } = this.state;
    return (
      <div {...styleNameFactory()}>
        <fieldset {...styleNameFactory("fieldset")}>
          <legend {...styleNameFactory("legend")}>
            <Tab
              isActive={activeIndex === 0}
              styleNameFactory={styleNameFactory}
              onClick={this.selectTab(0)}
            >
              Periodically
            </Tab>
            <Tab
              isActive={activeIndex === 1}
              styleNameFactory={styleNameFactory}
              onClick={this.selectTab(1)}
            >
              Periodically within a time frame
            </Tab>
            <Tab
              isActive={activeIndex === 2}
              styleNameFactory={styleNameFactory}
              onClick={this.selectTab(2)}
            >
              At a recurring fixed time
            </Tab>
          </legend>
          <Component
            styleNameFactory={styleNameFactory}
            ref={(component: any) => (this.presetComponent = component)}
            expression={parseCronExpression(cronExpression || "")}
          />
        </fieldset>
        <div style={{ textAlign: "center" }}>
          <button
            {...styleNameFactory("action")}
            onClick={this.generateExpression}
            data-action={true}
          >
            Generate cron expression
          </button>
        </div>
        <If condition={!!generatedExpression && !!showResult}>
          <Then>
            <div data-result={true}>
              <hr {...styleNameFactory("hr")} />
              <PrettyExpression expression={generatedExpression} />
              <div {...styleNameFactory("result")}>{generatedExpression}</div>
            </div>
          </Then>
        </If>
      </div>
    );
  }
}

function PrettyExpression(props: any) {
  const { expression } = props;
  return (
    <div {...styleNameFactory("pretty-expression")}>
      {cronsTrue.toString(expression)}
    </div>
  );
}
