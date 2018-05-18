import * as React from "react";

import { Card, CardHeader } from "material-ui/Card";
import {
  Field,
  reduxForm,
  formValueSelector,
  SubmissionError
} from "redux-form";
import { TextField, Checkbox, SelectField } from "redux-form-material-ui";
import { MenuItem } from "material-ui";
import { connect } from "react-redux";
// import RaisedButton from "material-ui/RaisedButton";
import CronBuilder from "../../components/CronBuilder/CronBuilder";
// import cronsTrue from "cronstrue";
import ZincMessage from "../../components/Message";

interface IJobScheduleDetailViewProps {
  mode: string;
  jobName: string;
  scheduleName: string;
  cronExpression: string;
  jobNames: string[];
  active: boolean;
  styles: any;
  handleSubmit: (values: any) => void;
  dispatch: any;
  change: any;
  initialValues: any;
  reset: any;
}

interface IJobScheduleDetailState {
  messageOpen: boolean;
  messageText: string;
  messageTitle: string;
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
      messageTitle: ""
    };
  }

  public componentDidMount() {
    if (this.props.mode === "new") {
      this.props.change("cronExpression", "*/15 * * * *");
    }
  }

  // dispatches action to change form field as the cron builder component sits outside the scope of redux form
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

    // const cronExpr =
    //   this.props.initialValues && this.props.initialValues.cronExpression;

    const jobSelectionItems = this.props.jobNames.map((jobName: string) => {
      return <MenuItem value={jobName} key={jobName} primaryText={jobName} />;
    });

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
                component={SelectField}
                hintText="Job Name"
                floatingLabelText="Job Name"
                // validate={this.validate}
                disabled={this.props.mode === "edit"}
                ref={(jobName: any) => jobName}
                withRef={true}
              >
                {jobSelectionItems}
              </FormField>
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
              <FormField
                style={{ ...this.props.styles.textField, display: "none" }}
                name="cronExpression"
                component={TextField}
                hintText="cronExpression"
                floatingLabelText="cronExpression"
                disabled={true}
                ref={(cronExpression: any) => cronExpression}
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
              <CronBuilder
                cronExpression={this.props.cronExpression}
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

const validate = (values: any) => {
  const errors: any = {};
  if (!values.scheduleName) {
    errors.scheduleName = "ScheduleName is required";
  } else if (values.scheduleName.length > 30) {
    errors.scheduleName = "ScheduleName too long.";
  }
  if (!values.jobName) {
    errors.jobName = "Job Name is required";
  }
  if (!values.cronExpression) {
    throw new SubmissionError({
      cronExpression: "Invalid Schedule",
      _error: "Please select a valid Schedule"
    });
  }
  return errors;
};

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
  },
  validate
})(ConnectedJobScheduleDetailView);

export default ConnectedJobScheduleDetailFormView;
