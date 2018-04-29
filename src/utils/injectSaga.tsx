import * as React from 'react';
import hoistNonReactStatics from './hoistNonReactStatics';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default ({ key, saga, mode }: any) => (WrappedComponent: any) => {
  class InjectSaga extends React.Component {
    public static WrappedComponent = WrappedComponent;
    public static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    public injectors = getInjectors(this.context.store);


    // static contextTypes = {
    //   store: PropTypes.object.isRequired,
    // };

    public componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga, mode }, this.props);
    }

    public componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }


    public render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
