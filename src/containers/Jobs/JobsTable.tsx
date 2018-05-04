import * as React from 'react';
import { DataTable } from '@salesforce/design-system-react';
import { DataTableColumn } from '@salesforce/design-system-react';
import { DataTableCell } from '@salesforce/design-system-react';
import { DataTableRowActions } from '@salesforce/design-system-react';
import { IconSettings } from '@salesforce/design-system-react';
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import customSprite from '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
import ZincMessage from './message'
import { IDetailedJobInfoResource } from './IJobCollection';
import { parse, format } from 'date-fns'


const CustomDataTableCell: any = ({ children, ...props }: any) => (
    <DataTableCell title={children} {...props}>
        <a
            href="javascript:void(0);"
            // tslint:disable-next-line jsx-no-lambda
            onClick={(event) => {
                event.preventDefault();
            }}
        >
            {children}
        </a>
    </DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;


interface IJobsTableProps {

    items: IDetailedJobInfoResource[];
    onChange: (selection: any) => void;

}

interface IJobsTableState {
    messageOpen: boolean,
    sortColumn: string,
    sortColumnDirection: any;
    items: any[],
    selection: any[],
    messageText: string,
    messageTitle: string,
}

class JobsTable extends React.Component<IJobsTableProps, IJobsTableState> {
    public displayName: string = 'JobsDataTable';
    public state: IJobsTableState;

    constructor(props: any) {
        super(props);

        this.state = {
            messageOpen: false,
            messageText: '',
            messageTitle: '',
            sortColumn: 'name',
            sortColumnDirection: {
                name: 'asc',
            },
            items: [
            ],
            selection: [

            ],
        };

    };



    public componentWillMount() {

        this.setState(this.formatItems);

    }




    public componentWillReceiveProps(newProps: IJobsTableProps) {

        console.log('set state update items', newProps.items)
        this.setState(this.formatItems);

    }

    public handleChanged = (selection: any) => {
        this.setState({ selection });
    };

    public handleRowAction = (item: IDetailedJobInfoResource, action: any) => {
        if (item.launchable === false) {
            this.setState({
                messageOpen: true,
                messageText: "This job cannot be executed at the moment. Some jobs are only allowed to have one executing instance. If that is the case, please wait for the current instance to finish"
                , messageTitle: "Cannot Execute Job"
            });
            return;
        } else {
            // launch
        }
    };

    public handleSort = (sortColumn: any, ...rest: any[]) => {


        const sortProperty = sortColumn.property;
        const sortDirection = sortColumn.sortDirection;
        const newState = {
            sortColumn: sortProperty,
            sortColumnDirection: {
                [sortProperty]: sortDirection,
            },
            items: [...this.state.items],
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

            if (sortDirection === 'desc') {
                val *= -1;
            }

            return val;
        });

        this.setState(newState);
    };

    public onMessageClose = () => {

        this.setState({
            messageOpen: false,
        });
    }

    public render() {
        return (
            <div>
                <ZincMessage messageText={this.state.messageText} messageTitle={this.state.messageTitle} onClose={this.onMessageClose} isOpen={this.state.messageOpen} />

                <IconSettings utilitySprite={utilitySprite} customSprite={customSprite} standardSprite={standardSprite}>
                    <DataTable
                        fixedLayout={true}
                        items={this.state.items || [{}]}
                        id="JobsDataTable"
                        onChange={this.handleChanged}
                        onSort={this.handleSort}
                        selection={this.state.selection}
                        selectRows={true}
                    >
                        <DataTableColumn
                            isSorted={this.state.sortColumn === 'name'}
                            label="Name"
                            primaryColumn={true}
                            property="name"
                            sortable={true}
                            sortDirection={this.state.sortColumnDirection.name}
                            width="8rem"
                        >
                            <CustomDataTableCell />
                        </DataTableColumn>
                        <DataTableColumn
                            label="Execution Count"
                            property="executionCount"
                            width="8rem"
                        />
                        <DataTableColumn label="Last Job Instance" width="8rem" property="jobInstanceId" />
                        <DataTableColumn label="Last Job Start" width="8rem" property="startTimeDisplay" />
                        <DataTableColumn label="Last Job End" width="8rem" property="endTime" />
                        <DataTableColumn label="Last Status" width="8rem" property="status" />
                        <DataTableRowActions
                            options={[
                                {
                                    id: 0,
                                    label: 'Execute Now',
                                    value: '1',
                                    disabled: 'false'
                                }
                            ]}
                            onAction={this.handleRowAction}
                        />
                    </DataTable>
                </IconSettings>
                <pre>{JSON.stringify(this.state.items, null, 2)}</pre>
            </div>
        );
    };

    private formatItems = (previousState: any, currentProps: any) => {

        const mutatedItems = currentProps.items && currentProps.items.map((item: IDetailedJobInfoResource) => {
            return {
                ...item,
                startTimeDisplay: format(parse(item.startTime), 'MM/DD/YY HH:MI'),
                endTimeDisplay: item.endTime === 'N/A' ? item.endTime : format(parse(item.endTime), 'MM/DD/YY HH:MI'),

                status: item.exitStatus.exitCode
            }

        })

        return { ...previousState, items: mutatedItems };

    }
};
export default JobsTable;