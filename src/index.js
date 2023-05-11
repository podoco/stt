import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById("root")
);
