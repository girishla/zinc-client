import * as React from "react";
import * as BEMHelper from "react-bem-helper";
import { generateCronExpression, parseCronExpression } from "./utils";

import { noop } from "lodash";
import Tab from "./components/Tab";
import PeriodicallyTab from "./components/PeriodicallyTab";
import PeriodicallyFrameTab from "./components/PeriodicallyFrameTab";
import FixedTimeTab from "./components/FixedTimeTab";
import cronsTrue from "cronstrue";
import { Textarea } from "@salesforce/design-system-react";

import "react-select/dist/react-select.css";
import "./cron-builder.css";
import RaisedButton from "material-ui/RaisedButton";
import ZincMessage from "../Message";

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
  messageOpen: boolean;
  messageText: string;
  messageTitle: string;
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
      generatedExpression: "",
      messageOpen: false,
      messageText: "",
      messageTitle: ""
    };
  }

  public generateExpression = () => {
    const { onChange }: any = this.props;
    let newState = {};
    try {
      newState = {
        generatedExpression: generateCronExpression(
          this.presetComponent.getExpression()
        )
      };
    } catch (e) {
      this.setState({
        messageOpen: true,
        messageText: "Invalid Schedule selections. Please review.",
        messageTitle: "Error cannot save."
      });
    }

    this.setState({ ...newState }, () => {
      try {
        cronsTrue.toString(this.state.generatedExpression);
        onChange(this.state.generatedExpression);
      } catch (e) {
        this.setState({
          messageOpen: true,
          messageText: "Invalid Schedule selections. Please review.",
          messageTitle: "Error cannot save."
        });
      }
    });
  };

  public componentDidCatch(error: any, info: any) {
    this.setState({
      messageOpen: true,
      messageText:
        "Most likely cause is Invalid Schedule selections. Please review.",
      messageTitle: "An Error Occured"
    });
  }

  public selectTab = (activeIndex: number) => {
    return () => {
      this.setState({
        activeIndex,
        Component: components[activeIndex]
      });
    };
  };

  public onMessageClose = () => {
    this.setState({
      messageOpen: false
    });
  };

  public render() {
    const { cronExpression } = this.props;
    const { activeIndex, Component } = this.state;
    return (
      <div {...styleNameFactory()}>
        <ZincMessage
          messageText={this.state.messageText}
          messageTitle={this.state.messageTitle}
          onClose={this.onMessageClose}
          isOpen={this.state.messageOpen}
        />
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
        <div style={{ textAlign: "center", width: "80%" }}>
          <RaisedButton
            {...styleNameFactory("action")}
            type={"submit"}
            label="Save"
            primary={true}
            onClick={this.generateExpression}
            data-action={true}
          />
          <Textarea
            name="cronExpressionTextArea"
            {...styleNameFactory("textarea")}
            label=""
            disabled={true}
            placeholder={"Runs " + cronsTrue.toString(cronExpression)}
          />

          {/* <button
            {...styleNameFactory("action")}
            onClick={this.generateExpression}
            data-action={true}
          >
            Generate cron expression
          </button> */}
        </div>
      </div>
    );
  }
}
