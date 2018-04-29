import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'sanitize.css/sanitize.css';
import configureStore from './configureStore';
import App from './containers/App';
import sagas from './containers/Layout/sagas';
// Import CSS reset and Global Styles
import './global-styles';
import registerServiceWorker from './registerServiceWorker';


// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

// Inject default app sagas
sagas.map(store.runSaga);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
