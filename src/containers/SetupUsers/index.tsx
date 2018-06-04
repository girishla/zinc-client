import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { createStructuredSelector } from "reselect";
import { IRootState } from "../../IRootState";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import { userIsNotAuthenticatedRedir } from "../Login/auth-routing";
import { IUserCollection } from "./IUser";
import UsersListView from "./userListView";
import { userActions } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { withRouter, RouteComponentProps } from "react-router";
import { layoutActions } from "../Layout/actions";

interface IUsersProps extends RouteComponentProps<any> {
  users: { data: IUserCollection };
  usersActions: typeof userActions;
  layoutActions: typeof layoutActions;
  loading: boolean;
  userNames: string[];
}

class ZincUsers extends React.Component<IUsersProps> {
  public static defaultProps = {
    users: {
      data: []
    },
    userNames: []
  };

  public props: IUsersProps;

  constructor(props: IUsersProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.usersActions.loadUsers();
  }

  public render() {
    return (
      <UsersListView
        loading={this.props.loading || false}
        users={this.props.users && this.props.users.data}
        usersActions={this.props.usersActions}
        layoutActions={this.props.layoutActions}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: (store: IRootState) => store.users,
  loading: (store: IRootState) => store.users && store.users.loading
});

function mapDispatchToProps(dispatch: any) {
  return {
    usersActions: bindActionCreators(userActions, dispatch),
    layoutActions: bindActionCreators(layoutActions, dispatch)
  };
}

const withReducer = injectReducer({ key: "users", reducer });
const withSaga = injectSaga({ key: "users", saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withReducer,
  withSaga,
  userIsNotAuthenticatedRedir
)(ZincUsers);
