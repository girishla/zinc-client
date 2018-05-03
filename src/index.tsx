import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'sanitize.css/sanitize.css';
import configureStore from './configureStore';
import App from './containers/App';
import layoutSagas from './containers/Layout/sagas';
import authSagas from './containers/Login/saga';
// Import CSS reset and Global Styles
import './global-styles';
import registerServiceWorker from './registerServiceWorker';


// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

// Inject sagas
layoutSagas.map(store.runSaga);
authSagas.map(store.runSaga);

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
