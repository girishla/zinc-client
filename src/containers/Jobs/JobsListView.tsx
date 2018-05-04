
import * as React from 'react';
import { IconSettings } from '@salesforce/design-system-react';
import { PageHeader } from '@salesforce/design-system-react';
import { Button } from '@salesforce/design-system-react';
import { ButtonGroup } from '@salesforce/design-system-react';
import { Dropdown } from '@salesforce/design-system-react';
import { DropdownTrigger } from '@salesforce/design-system-react';
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import customSprite from '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
import { blue300 } from 'material-ui/styles/colors';
import JobsTable from './JobsTable';
import { IDetailedJobInfoResource } from './IJobCollection';



interface IJobsListViewProps {

    jobs: IDetailedJobInfoResource[];

}

class JobsListView extends React.Component<IJobsListViewProps> {


    public jobsTableSelectionsChange() {

    }



    public render() {
        const navRight = (
            <div>
                <ButtonGroup>
                    <Button label="New Job" disabled={true} />
                    <Button label="Import Jobs" disabled={true} />
                    <Dropdown
                        align="right"
                        assistiveText="More Options"
                        iconName="down"
                        iconVariant="border-filled"
                        options={
                            [
                                { label: 'Menu Item One', value: 'A0' },
                                { label: 'Menu Item Two', value: 'B0' },
                                { label: 'Menu Item Three', value: 'C0' },
                                { type: 'divider' },
                                { label: 'Menu Item Four', value: 'D0' },
                            ]}
                    />
                </ButtonGroup>
            </div>
        );

        const contentRight = (
            <div>
                <Dropdown
                    align="right"
                    options={
                        [
                            { label: 'Menu Item One', value: 'A0' },
                            { label: 'Menu Item Two', value: 'B0' },
                            { label: 'Menu Item Three', value: 'C0' },
                            { type: 'divider' },
                            { label: 'Menu Item Four', value: 'D0' },
                        ]}
                >
                    <DropdownTrigger>
                        <Button
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
                    options={
                        [
                            { label: 'Menu Item One', value: 'A0' },
                            { label: 'Menu Item Two', value: 'B0' },
                            { label: 'Menu Item Three', value: 'C0' },
                            { type: 'divider' },
                            { label: 'Menu Item Four', value: 'D0' },
                        ]}
                >
                    <DropdownTrigger>
                        <Button
                            assistiveText="Change view"
                            className="slds-m-right--xx-small"
                            iconName="table"
                            iconVariant="more"
                            variant="icon"
                        />
                    </DropdownTrigger>
                </Dropdown>
                < Button
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
                />
                <div>
                    <ButtonGroup>
                        <Button
                            assistiveText="Charts"
                            iconName="chart"
                            iconVariant="border"
                            variant="icon"
                        />
                        <Button
                            assistiveText="Filters"
                            iconName="filterList"
                            iconVariant="border"
                            variant="icon"
                        />
                    </ButtonGroup>
                </div>
            </div>
        );

        return (
            <div style={{ flex: 1 }}>
                <section className="slds-clearfix" />
                <IconSettings utilitySprite={utilitySprite} customSprite={customSprite} standardSprite={standardSprite}>
                    <PageHeader
                        contentRight={contentRight}
                        iconAssistiveText="Jobs"
                        iconCategory="standard"
                        iconName="lead_list"
                        iconStyle={{ fill: blue300 }}
                        iconVariant="border-filled"
                        info="Jobs that have been configured by your administrator"
                        label="Jobs"
                        navRight={navRight}
                        title={
                            < h1 className="slds-page-header__title slds-p-right--x-small" >
                                <Dropdown
                                    options={
                                        [
                                            { label: 'Menu Item One', value: 'A0' },
                                            { label: 'Menu Item Two', value: 'B0' },
                                            { label: 'Menu Item Three', value: 'C0' },
                                            { type: 'divider' },
                                            { label: 'Menu Item Four', value: 'D0' },
                                        ]
                                    }
                                >
                                    <DropdownTrigger>
                                        <Button
                                            className="slds-button--reset slds-type-focus"
                                            iconName="down"
                                            iconPosition="right"
                                            label="All Jobs"
                                            responsive={true}
                                            variant="base"
                                        />
                                    </DropdownTrigger>
                                </Dropdown>
                            </h1>
                        }
                        truncate={true}
                        variant="objectHome"
                    />
                    <JobsTable items={this.props.jobs} onChange={this.jobsTableSelectionsChange} />
                </IconSettings>
            </div>
        );
    }
}

export default JobsListView;