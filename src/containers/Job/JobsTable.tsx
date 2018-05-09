import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import {
  DataTable,
  DataTableCell,
  DataTableColumn,
  DataTableRowActions,
  IconSettings
} from "@salesforce/design-system-react";
import { format, parse } from "date-fns";
import * as React from "react";
import { IDetailedJobInfoResource } from "./IJobCollection";
import ZincMessage from "./message";
import TableWrappedCell from "../../components/TableWrappedCell";
import { Link } from "react-router-dom";

const DrillToExecutionListViewCell: any = ({ children, ...props }: any) => (
  <DataTableCell title={children} {...props}>
    <Link to={`/jobs/${props.item.name}/executions`}>{children}</Link>
  </DataTableCell>
);
DrillToExecutionListViewCell.displayName = DataTableCell.displayName;

interface IJobsTableProps {
  items: IDetailedJobInfoResource[];
  onChange: (selection: any) => void;
}

interface IJobsTableState {
  messageOpen: boolean;
  sortColumn: string;
  sortColumnDirection: any;
  items: any[];
  selection: any[];
  messageText: string;
  messageTitle: string;
}

class JobsTable extends React.Component<IJobsTableProps, IJobsTableState> {
  public displayName: string = "JobsDataTable";
  public state: IJobsTableState;

  constructor(props: any) {
    super(props);

    this.state = {
      messageOpen: false,
      messageText: "",
      messageTitle: "",
      sortColumn: "name",
      sortColumnDirection: {
        name: "asc"
      },
      items: [],
      selection: []
    };
  }

  public componentWillMount() {
    this.setState(this.formatItems);
  }

  public componentWillReceiveProps(newProps: IJobsTableProps) {
    this.setState(this.formatItems);
  }

  public handleChanged = (selection: any) => {
    this.setState({ selection });
  };

  public handleRowAction = (item: IDetailedJobInfoResource, action: any) => {
    if (item.launchable === false) {
      this.setState({
        messageOpen: true,
        messageText:
          "This job cannot be executed at the moment. Some jobs are only allowed to have one executing instance. If that is the case, please wait for the current instance to finish",
        messageTitle: "Cannot Execute Job"
      });
      return;
    } else {
      // launch and go to exectution detail view
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
            id="JobsDataTable"
            onChange={this.handleChanged}
            onSort={this.handleSort}
            selection={this.state.selection}
            selectRows={true}
          >
            <DataTableColumn
              isSorted={this.state.sortColumn === "name"}
              label="Name"
              primaryColumn={true}
              property="name"
              sortable={true}
              sortDirection={this.state.sortColumnDirection.name}
              width="6rem"
            >
              <TableWrappedCell />
            </DataTableColumn>
            <DataTableColumn
              label="Description"
              property="description"
              width="20rem"
            >
              <TableWrappedCell />
            </DataTableColumn>
            <DataTableColumn
              label="Execution Count"
              width="6rem"
              property="executionCount"
            >
              <DrillToExecutionListViewCell title={""} />
            </DataTableColumn>

            <DataTableColumn
              label="Last Job Start"
              width="8rem"
              property="startTimeDisplay"
            />
            <DataTableColumn
              label="Last Job End"
              width="8rem"
              property="endTimeDisplay"
            />
            <DataTableColumn
              label="Last Status"
              width="8rem"
              property="status"
            />
            <DataTableRowActions
              options={[
                {
                  id: 0,
                  label: "Execute Now",
                  value: "1",
                  disabled: "false"
                }
              ]}
              onAction={this.handleRowAction}
            />
          </DataTable>
        </IconSettings>
        {/* <pre>{JSON.stringify(this.state.items, null, 2)}</pre> */}
      </div>
    );
  }

  private formatItems = (previousState: any, currentProps: any) => {
    const mutatedItems =
      currentProps.items &&
      currentProps.items.map((item: IDetailedJobInfoResource) => {
        return {
          ...item,
          startTimeDisplay:
            item.startTime === "N/A" || !item.startTime
              ? ""
              : format(
                  parse(item.startTime, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),
          endTimeDisplay:
            item.endTime === "N/A" || !item.endTime
              ? ""
              : format(
                  parse(item.endTime, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),

          status: item.exitStatus && item.exitStatus.exitCode
        };
      });

    return { ...previousState, items: mutatedItems };
  };
}
export default JobsTable;
