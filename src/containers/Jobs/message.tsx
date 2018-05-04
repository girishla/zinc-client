


import * as React from 'react';
import { IconSettings } from '@salesforce/design-system-react';
import { Modal } from '@salesforce/design-system-react';
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';

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
        return (
            <IconSettings utilitySprite={utilitySprite}>
                <div>
                    <Modal parentSelector={() => document.body}
                        isOpen={this.props.isOpen}
                        onRequestClose={this.props.onClose}
                        align={'center'}
                        title={this.props.messageTitle}
                    >
                        <section className="slds-p-around--medium">
                            <p>
                                {this.props.messageText}
                            </p>

                        </section>
                    </Modal>

                </div>
            </IconSettings >
        );
    }
};

export default ZincMessage;