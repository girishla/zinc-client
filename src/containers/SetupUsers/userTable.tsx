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

import { IUser } from "./IUser";
import { IUserTableRowAction } from "./IUserTableRowAction";
import { Link } from "react-router-dom";
import Card from "material-ui/Card";

const DrillToDetailViewCell: any = ({ children, ...props }: any) => (
  <DataTableCell title={children} {...props}>
    <Link to={`/setup/sobjects/${props.item.name}`}>{children}</Link>
  </DataTableCell>
);
DrillToDetailViewCell.displayName = DataTableCell.displayName;

interface IUsersTableProps {
  items: IUser[];
  onChange: (selection: any) => void;
  onDelete: any;
}

interface IUsersTableState {
  sortColumn: string;
  sortColumnDirection: any;
  items: IUser[];
  selection: any[];
}

class UsersTable extends React.Component<IUsersTableProps, IUsersTableState> {
  public displayName: string = "UsersDataTable";
  public state: IUsersTableState;

  constructor(props: any) {
    super(props);

    this.state = {
      sortColumn: "username",
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

  public componentWillReceiveProps(newProps: IUsersTableProps) {
    this.setState(this.formatItems);
  }

  public handleChanged = (selection: any) => {
    this.setState({ selection });
  };

  public handleRowAction = (item: IUser, action: IUserTableRowAction) => {
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
            id="UsersDataTable"
            onChange={this.handleChanged}
            onSort={this.handleSort}
            // selection={this.state.selection}
            // selectRows={true}
          >
            <DataTableColumn
              label="User Name"
              width="7rem"
              primaryColumn={true}
              property="username"
              isSorted={true}
              sortable={true}
              sortDirection={this.state.sortColumnDirection.username}
            >
              {/* <DrillToDetailViewCell title={""} /> */}
            </DataTableColumn>
            {/* <DataTableColumn label="label" width="8rem" property="label" /> */}
            <DataTableColumn label="Email" width="10rem" property="email" />
            <DataTableColumn
              label="Authorities"
              width="4rem"
              property="authorities"
            />

            <DataTableColumn
              label="LastPasswordReset"
              width="5rem"
              property="lastPasswordResetDisplay"
            />
            <DataTableColumn
              label="Last Updated"
              width="5rem"
              property="updatedDateDisplay"
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
      currentProps.items.map((item: IUser) => {
        return {
          ...item,
          lastRefreshDateDisplay:
            item.modifiedDate === null
              ? ""
              : format(
                  parse(item.lastPasswordReset, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),
          updatedDateDisplay:
            item.modifiedDate === null
              ? ""
              : format(
                  parse(item.modifiedDate, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                )
        };
      });

    return { ...previousState, items: mutatedItems };
  };
}
export default UsersTable;
