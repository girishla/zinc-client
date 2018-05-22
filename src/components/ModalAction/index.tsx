import * as React from "react";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import { noop } from "lodash";

interface IZincModalActionProps {
  isModalOpen: boolean;
  onModalOk: any;
  onModalCancel: () => void;
  okActionName: string;
  modalTitle: string;
  modalContent: (
    modalData: any,
    onUpdateModalSelections: any,
    modalSelections: any
  ) => JSX.Element[] | JSX.Element;
  modalData: any;
  modalSelections: any;
  onUpdateModalSelections: any;
}

class ZincModalAction extends React.Component<IZincModalActionProps> {
  public static defaultProps = {
    okActionName: "Ok",
    onModalOk: noop,
    onModalCancel: noop,
    modalTitle: "",
    modalContent: noop,
    isModalOpen: false,
    modalData: {}
  };

  constructor(props: IZincModalActionProps) {
    super(props);
  }

  public clickedOk = () => {
    this.props.onModalOk(this.props.modalSelections);
  };

  public render() {
    const actions = [
      <RaisedButton
        key={"Cancel"}
        label={"Cancel"}
        primary={false}
        onClick={this.props.onModalCancel}
      />,
      <RaisedButton
        key={this.props.okActionName}
        label={this.props.okActionName}
        primary={true}
        onClick={this.clickedOk}
      />
    ];
    return (
      <Dialog
        title={this.props.modalTitle}
        actions={actions}
        modal={true}
        open={this.props.isModalOpen}
        onRequestClose={this.props.onModalCancel}
      >
        {this.props.modalContent(
          this.props.modalData,
          this.props.onUpdateModalSelections,
          this.props.modalSelections
        )}
      </Dialog>
    );
  }
}

export default ZincModalAction;
