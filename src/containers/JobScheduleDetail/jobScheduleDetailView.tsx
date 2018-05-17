import * as React from "react";

import { Card, CardHeader } from "material-ui/Card";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { TextField, Checkbox } from "redux-form-material-ui";
import { connect } from "react-redux";
// import RaisedButton from "material-ui/RaisedButton";
import CronBuilder from "../../components/CronBuilder/CronBuilder";
import cronsTrue from "cronstrue";
import ZincMessage from "../../components/Message";

interface IJobScheduleDetailViewProps {
  mode: string;
  jobName: string;
  scheduleName: string;
  cronExpression: string;
  active: boolean;
  styles: any;
  handleSubmit: (values: any) => void;
  dispatch: any;
  change: any;
  initialValues: any;
}

interface IJobScheduleDetailState {
  messageOpen: boolean;
  messageText: string;
  messageTitle: string;
  cronDescr: string;
}

class JobScheduleDetailView extends React.Component<
  IJobScheduleDetailViewProps,
  IJobScheduleDetailState
> {
  public state: IJobScheduleDetailState;

  constructor(props: any) {
    super(props);

    this.state = {
      messageOpen: false,
      messageText: "",
      messageTitle: "",
      cronDescr: ""
    };
  }

  public componentWillReceiveProps(newProps: IJobScheduleDetailViewProps) {
    try {
      this.setState({
        cronDescr: cronsTrue.toString(
          newProps.initialValues && newProps.initialValues.cronExpression
        )
      });
    } catch (e) {
      this.setState({
        messageOpen: true,
        messageText: "Error",
        messageTitle: "Invalid Schedule selections. Please review."
      });
    }
  }

  // dispatches action to change form field
  public preProcessSubmit = (cronExpr: any) => {
    if (!cronExpr) {
      cronExpr =
        this.props.initialValues && this.props.initialValues.cronExpression;
    }

    this.props.change("cronExpression", cronExpr);
    // setTimeout(this.props.dispatch(submit("jobScheduleDetailForm")));
  };

  public onMessageClose = () => {
    this.setState({
      messageOpen: false
    });
  };

  public render() {
    const FormField: any = Field;

    const cronExpr =
      this.props.initialValues && this.props.initialValues.cronExpression;

    return (
      <Card>
        <ZincMessage
          messageText={this.state.messageText}
          messageTitle={this.state.messageTitle}
          onClose={this.onMessageClose}
          isOpen={this.state.messageOpen}
        />
        <CardHeader
          title="Schedule Details"
          subtitle="Changes will take effect immediately"
        />
        <form ref={form => form} onSubmit={this.props.handleSubmit}>
          <div style={this.props.styles.container}>
            {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FormField
                style={this.props.styles.textField}
                name="jobName"
                component={TextField}
                hintText="Job Name"
                floatingLabelText="Job Name"
                validate={this.validate}
                disabled={this.props.mode === "edit"}
                ref={(jobName: any) => jobName}
                withRef={true}
              />
              <FormField
                style={this.props.styles.textField}
                name="scheduleName"
                component={TextField}
                hintText="Schedule Name"
                floatingLabelText="Schedule Name"
                validate={this.validate}
                disabled={this.props.mode === "edit"}
                ref={(scheduleName: any) => scheduleName}
                withRef={true}
              />
              <div>
                <FormField
                  style={{
                    ...this.props.styles.textField,
                    marginTop: 35,
                    width: 50
                  }}
                  name="active"
                  component={Checkbox}
                  label="Active"
                />
              </div>
            </div>
            <div>
              <TextField
                style={{
                  ...this.props.styles.textField,
                  width: 580,
                  marginTop: 20
                }}
                name="cronExpression"
                disabled={true}
                hintText={"Runs " + this.state.cronDescr}
                floatingLabelText=""
              />
            </div>
            <div>
              <CronBuilder
                cronExpression={cronExpr}
                onChange={this.preProcessSubmit}
                showResult={true}
              />
            </div>
          </div>
        </form>
      </Card>
    );
  }

  private validate(value: string) {
    return value == null ? "Required" : undefined;
  }
}

const selector = formValueSelector("jobScheduleDetailForm");

const ConnectedJobScheduleDetailView: any = connect(state => ({
  scheduleName: selector(state, "scheduleName"),
  jobName: selector(state, "jobName"),
  cronExpression: selector(state, "cronExpression")
}))(JobScheduleDetailView);

const ConnectedJobScheduleDetailFormView: any = reduxForm({
  form: "jobScheduleDetailForm",
  enableReinitialize: true,
  initialValues: {
    scheduleName: "defaultSchedule1",
    jobName: "",
    active: true,
    cronExpression: ""
  }
})(ConnectedJobScheduleDetailView);

export default ConnectedJobScheduleDetailFormView;
