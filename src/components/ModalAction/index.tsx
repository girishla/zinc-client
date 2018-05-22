import * as React from "react";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import { noop } from "lodash";

interface IZincModalActionProps {
  isModalOpen: boolean;
  onModalOk: () => void;
  onModalCancel: () => void;
  okActionName: string;
  modalTitle: string;
  modalContent: (contentProps: any) => JSX.Element[] | JSX.Element;
}

class ZincModalAction extends React.Component<IZincModalActionProps> {
  public static defaultProps = {
    okActionName: "Ok",
    onModalOk: noop,
    onModalCancel: noop,
    modalTitle: "",
    modalContent: noop,
    isModalOpen: false
  };

  constructor(props: IZincModalActionProps) {
    super(props);
  }

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
        onClick={this.props.onModalOk}
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
        {this.props.modalContent && this.props.modalContent(this.state)}
      </Dialog>
    );
  }
}

export default ZincModalAction;
