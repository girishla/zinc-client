import * as React from 'react';
import hoistNonReactStatics from './hoistNonReactStatics'

import getInjectors from './reducerInjectors';


/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }: { key: string, reducer: any }) => (WrappedComponent: any) => {
  class ReducerInjector extends React.Component {
    public static WrappedComponent = WrappedComponent;
    // static contextTypes = {
    //   store: PropTypes.object.isRequired,
    // };
    public static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    public injectors = getInjectors(this.context.store);
    public componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }



    public render() {
      return <WrappedComponent{...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
