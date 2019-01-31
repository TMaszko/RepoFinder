import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Store} from "redux";

import App from "./App";
import {IMainState} from "./modules/states";
import getConfiguredStore from "./modules/store";
import * as serviceWorker from "./serviceWorker";

const store: Store<IMainState> = getConfiguredStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
