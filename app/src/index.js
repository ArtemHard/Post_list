import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import rootReducer from "./components/redux/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import initState from "./components/redux/initState";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  initState(),
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
