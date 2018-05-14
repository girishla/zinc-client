import * as React from "react";

import { Card, CardHeader, CardActions } from "material-ui/Card";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { TextField, Checkbox } from "redux-form-material-ui";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";

interface IJobScheduleDetailViewProps {
  mode: string;
  jobName: string;
  scheduleName: string;
  active: boolean;
  cronExpression: string;
  styles: any;
  handleSubmit: (values: any) => void;
}

class JobScheduleDetailView extends React.Component<
  IJobScheduleDetailViewProps
> {
  public render() {
    const FormField: any = Field;

    return (
      <Card>
        <CardHeader
          title="Schedule Details"
          subtitle="Changes will take effect immediately"
        />
        <form onSubmit={this.props.handleSubmit}>
          <div style={this.props.styles.container}>
            {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
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
                style={{ marginTop: 35, ...this.props.styles.textField }}
                name="active"
                component={Checkbox}
                label="Active"
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <CardActions style={{ marginLeft: "auto" }}>
              <RaisedButton type={"submit"} label="Save" primary={true} />
            </CardActions>
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
  scheduleName: selector(state, "scheduleName")
}))(JobScheduleDetailView);

const ConnectedJobScheduleDetailFormView: any = reduxForm({
  form: "jobScheduleDetailForm",
  initialValues: {
    scheduleName: "defaultSchedule1",
    jobName: "",
    active: true,
    cronExpression: ""
  }
})(ConnectedJobScheduleDetailView);

export default ConnectedJobScheduleDetailFormView;
