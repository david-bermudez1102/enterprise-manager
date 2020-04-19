import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./custom.scss";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { loadState, saveState } from "./localStorage/loadState";
import throttle from "lodash/throttle";

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

const { session, ...state } = store.getState();
store.subscribe(
  throttle(() => {
    saveState(state);
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
