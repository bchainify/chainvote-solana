import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import store, { history } from "./features";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import './style.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}></Router>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
