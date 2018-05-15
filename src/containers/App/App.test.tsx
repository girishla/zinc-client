import * as React from "react";
import * as ReactDOM from "react-dom";
import App from ".";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import configureStore from "../../configureStore";
import createHistory from "history/createMemoryHistory";

const initialState = {};
const history = createHistory();

const store = configureStore(initialState, createHistory());

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
