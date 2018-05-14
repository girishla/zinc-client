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

import { IJobSchedule } from "./IJobSchedule";
import { IJobScheduleTableRowAction } from "./IJobScheduleTableRowAction";
import ZincMessage from "../../components/Message";
import { Link } from "react-router-dom";

const DrillToStepListViewCell: any = ({ children, ...props }: any) => (
  <DataTableCell title={children} {...props}>
    <Link to={`/schedule/${props.item.scheduleName}`}>{children}</Link>
  </DataTableCell>
);
DrillToStepListViewCell.displayName = DataTableCell.displayName;

interface IJobSchedulesTableProps {
  items: IJobSchedule[];
  onChange: (selection: any) => void;
}

interface IJobSchedulesTableState {
  messageOpen: boolean;
  sortColumn: string;
  sortColumnDirection: any;
  items: IJobSchedule[];
  selection: any[];
  messageText: string;
  messageTitle: string;
}

class JobSchedulesTable extends React.Component<
  IJobSchedulesTableProps,
  IJobSchedulesTableState
> {
  public displayName: string = "JobSchedulesDataTable";
  public state: IJobSchedulesTableState;

  constructor(props: any) {
    super(props);

    this.state = {
      messageOpen: false,
      messageText: "",
      messageTitle: "",
      sortColumn: "scheduleName",
      sortColumnDirection: {
        scheduleName: "desc"
      },
      items: [],
      selection: []
    };
  }

  public componentWillMount() {
    this.setState(this.formatItems);
  }

  public componentWillReceiveProps(newProps: IJobSchedulesTableProps) {
    this.setState(this.formatItems);
  }

  public handleChanged = (selection: any) => {
    this.setState({ selection });
  };

  public handleRowAction = (
    item: IJobSchedule,
    action: IJobScheduleTableRowAction
  ) => {
    switch (action.value) {
      case "Pause":
        if (item.active === false) {
          this.setState({
            messageOpen: true,
            messageText: "This schedule is already paused.",
            messageTitle: "Cannot pause Job Schedule"
          });
          return;
        } else {
          // Submit Pause Request
        }
        break;
      case "Delete":
        // Submit Delete schedule request
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

  public onMessageClose = () => {
    this.setState({
      messageOpen: false
    });
  };

  public render() {
    return (
      <div>
        <ZincMessage
          messageText={this.state.messageText}
          messageTitle={this.state.messageTitle}
          onClose={this.onMessageClose}
          isOpen={this.state.messageOpen}
        />

        <IconSettings
          utilitySprite={utilitySprite}
          customSprite={customSprite}
          standardSprite={standardSprite}
        >
          <DataTable
            fixedLayout={true}
            items={this.state.items || []}
            id="JobSchedulesDataTable"
            onChange={this.handleChanged}
            onSort={this.handleSort}
            selection={this.state.selection}
            selectRows={true}
          >
            <DataTableColumn
              isSorted={true}
              label="Name"
              width="5rem"
              primaryColumn={true}
              property="scheduleName"
              sortable={true}
              sortDirection={this.state.sortColumnDirection.scheduleName}
            >
              <DrillToStepListViewCell title={""} />
            </DataTableColumn>

            <DataTableColumn
              isSorted={false}
              label="Job Name"
              property="jobName"
              sortable={false}
              width="5rem"
            />
            <DataTableColumn
              label="Description"
              width="8rem"
              property="cronDescription"
            />
            <DataTableColumn
              label="Next Run time"
              width="6rem"
              property="nextFireTimeDisplay"
            />

            <DataTableColumn label="Status" width="5rem" property="status" />
            <DataTableRowActions
              options={[
                {
                  id: 0,
                  label: "Pause",
                  value: "Pause",
                  disabled: "false"
                },
                {
                  id: 1,
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
      </div>
    );
  }

  private formatItems = (previousState: any, currentProps: any) => {
    const mutatedItems =
      currentProps.items &&
      currentProps.items.map((item: IJobSchedule) => {
        return {
          ...item,
          nextFireTimeDisplay: format(
            parse(item.nextFireTime, "YYYY-MM-DDTHH:mm", new Date()),
            "MM/DD/YY HH:mm"
          ),
          status: item.active === true ? "Active" : "Paused",

          id: item.scheduleName
        };
      });

    return { ...previousState, items: mutatedItems };
  };
}
export default JobSchedulesTable;
