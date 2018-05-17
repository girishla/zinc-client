import * as React from "react";
// import { IconSettings } from "@salesforce/design-system-react";
// import { Modal } from "@salesforce/design-system-react";
// import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

interface IZincMessageProps {
  isOpen: boolean;
  onClose: () => void;
  messageText: string;
  messageTitle: string;
}

class ZincMessage extends React.Component<IZincMessageProps> {
  constructor(props: IZincMessageProps) {
    super(props);
  }

  public render() {
    const actions = [
      <RaisedButton
        key={this.props.messageTitle}
        label="OK"
        primary={true}
        onClick={this.props.onClose}
      />
    ];
    return (
      <Dialog
        title={this.props.messageTitle}
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.onClose}
      >
        {this.props.messageText}
      </Dialog>
    );
  }
}

export default ZincMessage;
