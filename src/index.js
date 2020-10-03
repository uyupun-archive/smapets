import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./router";
import * as serviceWorker from "./serviceWorker";

import { Client } from "./service/client/client";

const client = new Client();
client.updateUser({ name: "test" });
client.updateDog({
  kind: "inu",
  name: "いぬ",
  createDatetime: new Date(),
  maxHP: 100,
  hp: 80,
});

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
