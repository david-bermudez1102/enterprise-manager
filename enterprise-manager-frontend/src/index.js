import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { rootReducer } from "./reducers/rootReducer"
import { loadState, saveState } from "./localStorage/loadState"
import throttle from "lodash/throttle"
import actioncable from "actioncable"

const CableApp = {}
CableApp.cable = actioncable.createConsumer("ws://localhost:3000/api/v1/cable")

const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(thunk))
)

store.subscribe(
  throttle(() => {
    const {
      session,
      routes,
      token,
      alerts,
      conversations,
      ...newState
    } = store.getState()
    saveState(newState)
  }, 1000)
)

ReactDOM.render(
  <Provider store={store}>
    <App cableApp={CableApp} />
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
