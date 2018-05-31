import * as React from "react";
import { IconSettings } from "@salesforce/design-system-react";
import { PageHeader } from "@salesforce/design-system-react";
import { Button } from "@salesforce/design-system-react";
import { ButtonGroup } from "@salesforce/design-system-react";
import { Dropdown } from "@salesforce/design-system-react";
import { DropdownTrigger } from "@salesforce/design-system-react";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import { blue300 } from "material-ui/styles/colors";
import { IJobExecutionInfoResource } from "./IJobExecutionCollection";
import JobExecutionsTable from "./jobExecutionsTable";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Loading from "../../components/Loading";
import { If, Then, Else } from "react-if";
import { jobExecutionActions } from "./actions";

interface IJobExecutionsListViewProps extends RouteComponentProps<any> {
  jobExecutions: IJobExecutionInfoResource[];
  refresh: any;
  loading: boolean;
  jobExecutionsActions: typeof jobExecutionActions;
}

class JobExecutionsListView extends React.Component<
  IJobExecutionsListViewProps
> {
  public jobExecutionsTableSelectionsChange() {}

  public render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button label="Restart Selected" disabled={true} />
        </ButtonGroup>
      </div>
    );

    const contentRight = (
      <div>
        <Dropdown align="right" options={[]}>
          <DropdownTrigger>
            <Button
              disabled={true}
              assistiveText="List View Controls"
              className="slds-m-right--xx-small"
              iconName="settings"
              iconVariant="more"
            />
          </DropdownTrigger>
        </Dropdown>
        <Dropdown
          align="right"
          assistiveText="Change view"
          iconName="settings"
          iconVariant="more"
          options={[]}
        >
          <DropdownTrigger>
            <Button
              disabled={true}
              assistiveText="Change view"
              className="slds-m-right--xx-small"
              iconName="table"
              iconVariant="more"
              variant="icon"
            />
          </DropdownTrigger>
        </Dropdown>
        <Button
          disabled={true}
          assistiveText="Edit List"
          iconName="edit"
          iconVariant="border"
          variant="icon"
        />
        <Button
          assistiveText="Refresh"
          iconName="refresh"
          iconVariant="border"
          variant="icon"
          onClick={this.props.refresh}
        />
        <div>
          <ButtonGroup>
            <Button
              disabled={true}
              assistiveText="Charts"
              iconName="chart"
              iconVariant="border"
              variant="icon"
            />
            <Button
              disabled={true}
              assistiveText="Filters"
              iconName="filterList"
              iconVariant="border"
              variant="icon"
            />
          </ButtonGroup>
        </div>
      </div>
    );

    const tableContent = (
      <If condition={this.props.loading}>
        <Then>
          <Loading />
        </Then>
        <Else>
          <JobExecutionsTable
            items={this.props.jobExecutions}
            onChange={this.jobExecutionsTableSelectionsChange}
            stopJob={this.props.jobExecutionsActions.stopJobExecution}
            restartJob={this.props.jobExecutionsActions.restartJobExecution}
          />
        </Else>
      </If>
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
            iconAssistiveText="Job Executions"
            iconCategory="standard"
            iconName="lead_list"
            iconStyle={{ fill: blue300 }}
            iconVariant="border-filled"
            info={
              this.props.jobExecutions &&
              this.props.jobExecutions.length +
                " execution(s) sorted by execution Id"
            }
            label="Job Executions"
            navRight={navRight}
            title={
              <h1 className="slds-page-header__title slds-p-right--x-small">
                {"All Job Executions"}
              </h1>
            }
            truncate={true}
            variant="objectHome"
          />

          {tableContent}
        </IconSettings>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    );
  }
}

export default withRouter(JobExecutionsListView);
