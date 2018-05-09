import * as React from "react";
import { DataTableCell } from "@salesforce/design-system-react";

const TableWrappedCell: any = ({ children, ...props }: any) => (
  <DataTableCell
    title={children}
    {...{ ...props, fixedLayout: false, className: "slds-cell-wrap" }}
  >
    <span>{children}</span>
  </DataTableCell>
);
TableWrappedCell.displayName = DataTableCell.displayName;

export default TableWrappedCell;
