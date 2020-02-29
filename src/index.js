import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux"; // this will provide redux store datat to react components

// we can pass in inital store here to override default paramenrts set in reducers.
// When is the good time to pass in initial paramets here?
// if you want to rehydrate the store using some seperate state that is passed down form the server or stored in local storage, then this would be a god place to do so
const store = configureStore();
render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
