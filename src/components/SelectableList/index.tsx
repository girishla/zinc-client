import { List, makeSelectable } from 'material-ui/List';
import * as React from 'react';


interface IComposedComponentProps {
  className: string;
  defaultValue: number;
  onSelectedIndexChanged?: any;
  children?: any;
  defaultItem: any;
  ref: any;
}
interface IComposedComponentState {
  selectedIndex: number;
}

function wrapState(ComposedComponent: any) {
  return class SelectableList extends React.Component<IComposedComponentProps, IComposedComponentState> {

    public props: IComposedComponentProps;
    public state: IComposedComponentState;
    public componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    public handleRequestChange = (event: Event, index: number) => {
      if (index > -1) {
        this.setState({
          selectedIndex: index,
        });

        if (this.props.onSelectedIndexChanged) {
          this.props.onSelectedIndexChanged(index);
        }
      }
    };

    public setSelectedIndex(index: number) {
      this.setState({
        selectedIndex: index,
      });
    }

    public render() {
      return (
        <ComposedComponent
          className={this.props.className}
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

export default wrapState(makeSelectable(List));
