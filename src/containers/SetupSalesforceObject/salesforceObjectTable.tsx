import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import {
  DataTable,
  DataTableColumn,
  DataTableRowActions,
  IconSettings,
  DataTableCell
} from "@salesforce/design-system-react";
import { format, parse } from "date-fns";
import * as React from "react";

import { ISalesforceObject } from "./ISalesforceObject";
import { ISalesforceObjectTableRowAction } from "./ISalesforceObjectTableRowAction";
import { Link } from "react-router-dom";
import Card from "material-ui/Card";

const DrillToDetailViewCell: any = ({ children, ...props }: any) => (
  <DataTableCell title={children} {...props}>
    <Link to={`/setup/sobjects/${props.item.name}`}>{children}</Link>
  </DataTableCell>
);
DrillToDetailViewCell.displayName = DataTableCell.displayName;

interface ISalesforceObjectsTableProps {
  items: ISalesforceObject[];
  onChange: (selection: any) => void;
  onDelete: any;
}

interface ISalesforceObjectsTableState {
  sortColumn: string;
  sortColumnDirection: any;
  items: ISalesforceObject[];
  selection: any[];
}

class SalesforceObjectsTable extends React.Component<
  ISalesforceObjectsTableProps,
  ISalesforceObjectsTableState
> {
  public displayName: string = "SalesforceObjectsDataTable";
  public state: ISalesforceObjectsTableState;

  constructor(props: any) {
    super(props);

    this.state = {
      sortColumn: "updatedDate",
      sortColumnDirection: {
        updatedDate: "desc"
      },
      items: [],
      selection: []
    };
  }

  public componentWillMount() {
    this.setState(this.formatItems);
  }

  public componentWillReceiveProps(newProps: ISalesforceObjectsTableProps) {
    this.setState(this.formatItems);
  }

  public handleChanged = (selection: any) => {
    this.setState({ selection });
  };

  public handleRowAction = (
    item: ISalesforceObject,
    action: ISalesforceObjectTableRowAction
  ) => {
    switch (action.value) {
      case "Clear Refresh Date":
        // Submit
        break;
      case "Delete":
        this.props.onDelete(item);
        break;
      case "Edit":
        // go to Edit Route
        break;
    }
  };

  public handleSort = (sortColumn: any, ...rest: any[]) => {
    const sortProperty = sortColumn.property;
    const sortDirection = sortColumn.sortDirection;
    const newState = {
      sortColumn: sortProperty,
      sortColumnDirection: {
        [sortProperty]: sortDirection
      },
      items: [...this.state.items]
    };

    // needs to work in both directions
    newState.items = newState.items.sort((a, b) => {
      let val = 0;

      if (a[sortProperty] > b[sortProperty]) {
        val = 1;
      }
      if (a[sortProperty] < b[sortProperty]) {
        val = -1;
      }

      if (sortDirection === "desc") {
        val *= -1;
      }

      return val;
    });

    this.setState(newState);
  };

  public render() {
    return (
      <Card
        style={{
          height: window.innerHeight - window.innerHeight / 2.5,
          overflow: "auto"
        }}
      >
        <IconSettings
          utilitySprite={utilitySprite}
          customSprite={customSprite}
          standardSprite={standardSprite}
        >
          <DataTable
            fixedLayout={true}
            items={this.state.items || []}
            id="SalesforceObjectsDataTable"
            onChange={this.handleChanged}
            onSort={this.handleSort}
            // selection={this.state.selection}
            // selectRows={true}
          >
            <DataTableColumn
              label="Name"
              width="7rem"
              primaryColumn={true}
              property="name"
            >
              {/* <DrillToDetailViewCell title={""} /> */}
            </DataTableColumn>
            {/* <DataTableColumn label="label" width="8rem" property="label" /> */}
            <DataTableColumn label="Custom" width="4rem" property="custom" />
            <DataTableColumn
              label="Queryable"
              width="4rem"
              property="queryable"
            />
            <DataTableColumn
              label="Retrieveable"
              width="4rem"
              property="retrieveable"
            />
            <DataTableColumn
              label="Replicateable"
              width="4rem"
              property="replicateable"
            />
            <DataTableColumn
              label="Last Refreshed"
              width="5rem"
              property="lastRefreshDateDisplay"
            />
            <DataTableColumn
              isSorted={true}
              label="Last Updated"
              width="5rem"
              property="updatedDateDisplay"
              sortable={true}
              sortDirection={this.state.sortColumnDirection.updatedDate}
            />

            <DataTableRowActions
              options={[
                {
                  id: 0,
                  label: "Delete",
                  value: "Delete",
                  disabled: "false"
                }
              ]}
              onAction={this.handleRowAction}
            />
          </DataTable>
        </IconSettings>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </Card>
    );
  }

  private formatItems = (previousState: any, currentProps: any) => {
    const mutatedItems =
      currentProps.items &&
      currentProps.items.map((item: ISalesforceObject) => {
        return {
          ...item,
          lastRefreshDateDisplay:
            item.lastRefreshDate === null
              ? ""
              : format(
                  parse(item.lastRefreshDate, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),
          updatedDateDisplay:
            item.updatedDate === null
              ? ""
              : format(
                  parse(item.updatedDate, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),
          custom: item.custom ? "Y" : "N",
          queryable: item.queryable ? "Y" : "N",
          retrieveable: item.retrieveable ? "Y" : "N",
          replicateable: item.replicateable ? "Y" : "N"
        };
      });

    return { ...previousState, items: mutatedItems };
  };
}
export default SalesforceObjectsTable;
