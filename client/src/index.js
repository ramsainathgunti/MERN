import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import authReducer from "./reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";

//redux toolkit store
const store = configureStore({
  reducer: { user: authReducer },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
