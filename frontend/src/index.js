import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "../src/redux/store/store";
import { ToastProvider } from "react-toast-notifications";
import LanguageContextProvider from "./context/languageContext";

ReactDOM.render(
  <>
    <LanguageContextProvider>
      <Provider store={store}>
        <ToastProvider
          autoDismiss={true}
          autoDismissTimeout={3000}
          placement="top-right"
          transitionDuration={300}
          transitionState="exiting"
        >
          <App />
        </ToastProvider>
      </Provider>
    </LanguageContextProvider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
