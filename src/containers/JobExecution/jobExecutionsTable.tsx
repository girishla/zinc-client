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

import { IJobExecutionInfoResource } from "./IJobExecutionCollection";
import { IJobExecutionTableRowAction } from "./IJobExecutionTableRowAction";
import { Link } from "react-router-dom";
import ZincMessage from "../../components/Message";

const DrillToStepListViewCell: any = ({ children, ...props }: any) => (
  <DataTableCell title={children} {...props}>
    <Link to={`/jobs/executions/${props.item.executionId}/steps`}>
      {children}
    </Link>
  </DataTableCell>
);
DrillToStepListViewCell.displayName = DataTableCell.displayName;

interface IJobExecutionsTableProps {
  items: IJobExecutionInfoResource[];
  onChange: (selection: any) => void;
  stopJob: any;
  restartJob: any;
}

interface IJobExecutionsTableState {
  messageOpen: boolean;
  sortColumn: string;
  sortColumnDirection: any;
  items: IJobExecutionInfoResource[];
  selection: any[];
  messageText: string;
  messageTitle: string;
}

class JobExecutionsTable extends React.Component<
  IJobExecutionsTableProps,
  IJobExecutionsTableState
> {
  public displayName: string = "JobExecutionsDataTable";
  public state: IJobExecutionsTableState;

  constructor(props: any) {
    super(props);

    this.state = {
      messageOpen: false,
      messageText: "",
      messageTitle: "",
      sortColumn: "executionId",
      sortColumnDirection: {
        executionId: "desc"
      },
      items: [],
      selection: []
    };
  }

  public componentWillMount() {
    this.setState(this.formatItems);
  }

  public componentWillReceiveProps(newProps: IJobExecutionsTableProps) {
    this.setState(this.formatItems);
  }

  public handleChanged = (selection: any) => {
    this.setState({ selection });
  };

  public handleRowAction = (
    item: IJobExecutionInfoResource,
    action: IJobExecutionTableRowAction
  ) => {
    switch (action.value) {
      case "Restart":
        if (item.restartable === false) {
          this.setState({
            messageOpen: true,
            messageText:
              "This job cannot be restarted. Only failed executions for jobs that have been configured to be restartable can be restarted.",
            messageTitle: "Cannot restart Job Execution"
          });
          return;
        } else {
          this.props.restartJob(item.jobId);
        }
        break;
      case "Stop":
        if (item.stoppable === false) {
          this.setState({
            messageOpen: true,
            messageText:
              "This job cannot be stopped. It may not currently be in a Stoppable status",
            messageTitle: "Cannot stop Job Execution"
          });
          return;
        } else {
          this.props.stopJob(item.jobId);
        }
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
            id="JobExecutionsDataTable"
            onChange={this.handleChanged}
            onSort={this.handleSort}
            selection={this.state.selection}
            selectRows={true}
          >
            <DataTableColumn
              isSorted={false}
              label="Job Name"
              property="name"
              sortable={false}
              width="8rem"
            />
            <DataTableColumn
              isSorted={true}
              label="Execution Id"
              width="5rem"
              primaryColumn={true}
              property="executionId"
              sortable={true}
              sortDirection={this.state.sortColumnDirection.executionId}
            />
            <DataTableColumn
              label="Step Count"
              width="5rem"
              property="stepExecutionCount"
            >
              <DrillToStepListViewCell title={""} />
            </DataTableColumn>
            <DataTableColumn
              label="Start Time"
              width="6rem"
              property="startTimeDisplay"
            />
            <DataTableColumn
              label="End Time"
              width="6rem"
              property="endTimeDisplay"
            />
            <DataTableColumn label="Status" width="5rem" property="status" />
            <DataTableRowActions
              options={[
                {
                  id: 0,
                  label: "Stop",
                  value: "Stop",
                  disabled: "false"
                },
                {
                  id: 1,
                  label: "Restart",
                  value: "Restart",
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
      currentProps.items.map((item: IJobExecutionInfoResource) => {
        return {
          ...item,
          startTimeDisplay:
            item.startTime === "N/A" || item.startTime === ""
              ? "N/A"
              : format(
                  parse(item.startTime, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),
          endTimeDisplay:
            item.endTime === "N/A" || item.endTime === ""
              ? "N/A"
              : format(
                  parse(item.endTime, "YYYY-MM-DDTHH:mm", new Date()),
                  "MM/DD/YY HH:mm"
                ),
          status: item.exitStatus.exitCode,
          id: item.executionId
        };
      });

    return { ...previousState, items: mutatedItems };
  };
}
export default JobExecutionsTable;
