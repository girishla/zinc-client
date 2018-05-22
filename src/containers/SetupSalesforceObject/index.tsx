import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { ISalesforceObjectCollection } from "./ISalesforceObject";
import SalesforceObjectsListView from "./salesforceObjectListView";
import { salesforceObjectActions } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { withRouter, RouteComponentProps } from "react-router";
import { layoutActions } from "../Layout/actions";

interface ISalesforceObjectsProps extends RouteComponentProps<any> {
  salesforceObjects: { data: ISalesforceObjectCollection };
  salesforceObjectsActions: typeof salesforceObjectActions;
  layoutActions: typeof layoutActions;
  loading: boolean;
}

class ZincSalesforceObjects extends React.Component<ISalesforceObjectsProps> {
  public static defaultProps = {
    salesforceObjects: {
      data: []
    }
  };

  public props: ISalesforceObjectsProps;

  constructor(props: ISalesforceObjectsProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.salesforceObjectsActions.loadSalesforceObjects();
  }

  public render() {
    return (
      <SalesforceObjectsListView
        loading={this.props.loading || false}
        salesforceObjects={
          this.props.salesforceObjects && this.props.salesforceObjects.data
        }
        salesforceObjectsActions={this.props.salesforceObjectsActions}
        layoutActions={this.props.layoutActions}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  salesforceObjects: (store: IRootState) => store.salesforceObjects,
  loading: (store: IRootState) =>
    store.salesforceObjects && store.salesforceObjects.loading
});

function mapDispatchToProps(dispatch: any) {
  return {
    salesforceObjectsActions: bindActionCreators(
      salesforceObjectActions,
      dispatch
    ),
    layoutActions: bindActionCreators(layoutActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "salesforceObjects", reducer });
const withSaga = injectSaga({ key: "salesforceObjects", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincSalesforceObjects);
