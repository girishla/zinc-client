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

interface ISalesforceObjectsListViewProps extends RouteComponentProps<any> {
  salesforceObjects: ISalesforceObjectCollection;
  salesforceObjectsActions: typeof salesforceObjectActions;
  loading: boolean;
}

class SalesforceObjectsListView extends React.Component<
  ISalesforceObjectsListViewProps
> {
  public salesforceObjectsTableSelectionsChange() {}

  public newSchedule = () => {
    this.props.history.push("/setup/sobjects/add");
  };

  public render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button label="+ Add" onClick={this.newSchedule} />
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
      <If condition={this.props.loading}>
        <Then>
          <Loading />
        </Then>
        <Else>
          <SalesforceObjectsTable
            items={
              this.props.salesforceObjects &&
              this.props.salesforceObjects._embedded &&
              this.props.salesforceObjects._embedded.sobjects
            }
            onChange={this.salesforceObjectsTableSelectionsChange}
            onDelete={
              this.props.salesforceObjectsActions.deleteSalesforceObject
            }
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
            iconAssistiveText="Salesforce Objects"
            iconCategory="standard"
            iconName="lead_list"
            iconStyle={{ fill: blue300 }}
            iconVariant="border-filled"
            info={
              this.props.salesforceObjects &&
              this.props.salesforceObjects.page &&
              this.props.salesforceObjects.page.totalElements +
                " object(s) sorted by Name"
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
