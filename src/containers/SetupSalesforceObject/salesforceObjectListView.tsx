import * as React from "react";
import { IconSettings } from "@salesforce/design-system-react";
import { PageHeader } from "@salesforce/design-system-react";
import { Button } from "@salesforce/design-system-react";
import { ButtonGroup } from "@salesforce/design-system-react";

import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import { blue300 } from "material-ui/styles/colors";
import { ISalesforceObjectCollection } from "./ISalesforceObject";
import SalesforceObjectsTable from "./salesforceObjectTable";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { salesforceObjectActions } from "./actions";
import { If, Then, Else } from "react-if";
import Loading from "../../components/Loading";
import { get as deepGet } from "lodash";
import { layoutActions } from "../Layout/actions";
import Select from "react-select";
import "react-select/dist/react-select.css";

interface ISalesforceObjectsListViewProps extends RouteComponentProps<any> {
  salesforceObjects: ISalesforceObjectCollection;
  salesforceObjectsActions: typeof salesforceObjectActions;
  layoutActions: typeof layoutActions;
  loading: boolean;
  salesforceObjectNames: string[];
}

class SalesforceObjectsListView extends React.Component<
  ISalesforceObjectsListViewProps
> {
  public salesforceObjectsTableSelectionsChange() {}

  public onAddObjectsButtonClick = () => {
    this.props.layoutActions.showModalDialog(
      "Add",
      this.saveAddedObjects,
      this.renderObjectNames,
      "Select Salesforce Objects",
      this.props.salesforceObjectNames
    );
  };

  public saveAddedObjects = (data: string) => {
    if (data) {
      this.props.salesforceObjectsActions.addSalesforceObject(data.split(","));
    }
  };

  public renderObjectNames = (
    modalData: string[],
    onDataChange: any,
    selections: string[]
  ) => {
    return (
      <div style={{ minHeight: 200 }}>
        <Select
          closeOnSelect={false}
          disabled={false}
          multi={true}
          onChange={onDataChange}
          autoFocus={true}
          openOnFocus={true}
          autosize={true}
          options={modalData.map((val: any) => {
            return { label: val, value: val };
          })}
          placeholder="Select Objects"
          removeSelected={true}
          rtl={false}
          simpleValue={true}
          value={selections}
        />
      </div>
    );
  };

  public render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button label="+ Add" onClick={this.onAddObjectsButtonClick} />
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
          onClick={this.props.salesforceObjectsActions.loadSalesforceObjects}
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

    const tableContent = (
      <div>
        <If condition={this.props.loading}>
          <Then>
            <Loading />
          </Then>
          <Else />
        </If>
        <SalesforceObjectsTable
          items={deepGet(this.props, "salesforceObjects._embedded.sobjects")}
          onChange={this.salesforceObjectsTableSelectionsChange}
          onDelete={this.props.salesforceObjectsActions.deleteSalesforceObject}
        />
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
            iconAssistiveText="Salesforce Objects"
            iconCategory="standard"
            iconName="lead_list"
            iconStyle={{ fill: blue300 }}
            iconVariant="border-filled"
            info={
              "Showing " +
              deepGet(
                this.props,
                "salesforceObjects._embedded.sobjects.length"
              ) +
              " of " +
              deepGet(this.props, "salesforceObjects.page.totalElements") +
              " objects sorted by Name"
            }
            label="Salesforce Objects"
            navRight={navRight}
            title={
              <h1 className="slds-page-header__title slds-p-right--x-small">
                Salesforce Objects Eligible for Replication
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

export default withRouter(SalesforceObjectsListView);
