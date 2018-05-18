import * as React from "react";
import { IconSettings } from "@salesforce/design-system-react";
import { PageHeader } from "@salesforce/design-system-react";
import { Button } from "@salesforce/design-system-react";
import { ButtonGroup } from "@salesforce/design-system-react";
// import { Dropdown } from "@salesforce/design-system-react";
// import { DropdownTrigger } from "@salesforce/design-system-react";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import { blue300 } from "material-ui/styles/colors";
import { IJobSchedule } from "./IJobSchedule";
import JobSchedulesTable from "./jobScheduleTable";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { jobScheduleActions } from "./actions";
// import { Card, CardEmpty } from "@salesforce/design-system-react";

interface IJobSchedulesListViewProps extends RouteComponentProps<any> {
  jobSchedules: IJobSchedule[];
  jobSchedulesActions: typeof jobScheduleActions;
}

class JobSchedulesListView extends React.Component<IJobSchedulesListViewProps> {
  public jobSchedulesTableSelectionsChange() {}

  public newSchedule = () => {
    this.props.history.push("/schedule/new");
  };

  public render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button label="New Schedule" onClick={this.newSchedule} />
        </ButtonGroup>
      </div>
    );

    const contentRight = (
      <div>
        <Button
          assistiveText="Edit List"
          iconName="edit"
          iconVariant="border"
          variant="icon"
          disabled={true}
        />
        <Button
          assistiveText="Refresh"
          iconName="refresh"
          iconVariant="border"
          variant="icon"
          onClick={this.props.jobSchedulesActions.loadJobSchedules}
        />
        <div>
          <ButtonGroup>
            <Button
              assistiveText="Charts"
              iconName="chart"
              iconVariant="border"
              variant="icon"
              disabled={true}
            />
            <Button
              assistiveText="Filters"
              iconName="filterList"
              iconVariant="border"
              variant="icon"
              disabled={true}
            />
          </ButtonGroup>
        </div>
      </div>
    );

    return (
      <div style={{ flex: 1 }}>
        <section className="slds-clearfix" />
        <IconSettings
          utilitySprite={utilitySprite}
          customSprite={customSprite}
          standardSprite={standardSprite}
        >
          <PageHeader
            contentRight={contentRight}
            iconAssistiveText="Job Schedule Items"
            iconCategory="standard"
            iconName="lead_list"
            iconStyle={{ fill: blue300 }}
            iconVariant="border-filled"
            info={
              this.props.jobSchedules &&
              this.props.jobSchedules.length +
                " schedule(s) sorted by schedule Name"
            }
            label="Job Schedule"
            navRight={navRight}
            title={
              <h1 className="slds-page-header__title slds-p-right--x-small">
                All Job Schedule Items
              </h1>
            }
            truncate={true}
            variant="objectHome"
          />
          <JobSchedulesTable
            items={this.props.jobSchedules}
            onChange={this.jobSchedulesTableSelectionsChange}
            onDelete={this.props.jobSchedulesActions.deleteJobSchedule}
          />
        </IconSettings>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    );
  }
}

export default withRouter(JobSchedulesListView);
