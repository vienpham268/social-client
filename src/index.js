import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider children={<App />}></AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
