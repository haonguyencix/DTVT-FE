import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import ROUTES, { RenderRoutes } from "core/routes";
import * as serviceWorker from "core/services/worker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "core/store/root";
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <RenderRoutes routes={ROUTES} />
      <ToastContainer />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
