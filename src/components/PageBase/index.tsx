import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import * as React from "react";
import styles from "../../styles";
import Spinner from "../Spinner";
import BreadCrumbs from "../BreadCrumbs";

interface IPageBaseProps {
  // navigation: any;
  noWrapContent: any;
  loading: boolean;
  title?: any;
  minHeight?: any;
  children?: any;
}

interface IPageBaseState {
  loading: boolean;
}

class PageBase extends React.Component<IPageBaseProps, IPageBaseState> {
  public state: IPageBaseState;

  constructor(props: IPageBaseProps) {
    super(props);
    this.state = {
      loading: this.props.loading
    };
  }

  public componentWillReceiveProps(nextProps: IPageBaseProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        loading: nextProps.loading
      });
    }
  }

  public render() {
    const { title, noWrapContent, children, minHeight } = this.props;

    const content = (
      <div style={{ minHeight: minHeight || 500, height: "100%" }}>
        {this.props.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner
              style={{ display: "inline-block" }}
              name="double-bounce"
              color="rgb(30, 136, 229)"
            />
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    );

    return (
      <div>
        <BreadCrumbs />
        {noWrapContent ? (
          <div>{content}</div>
        ) : (
          <Paper style={styles.paper}>
            <h3 style={styles.title}>{title}</h3>

            <Divider />

            {content}

            <div style={styles.clear} />
          </Paper>
        )}
      </div>
    );
  }
}

export default PageBase;
