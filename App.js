import * as React from "react";
import store from "./src/store/index";
import { Provider } from "react-redux";
import SiteApp from "./SiteApp";

export default function App() {
  return (
    <Provider store={store}>
      <SiteApp />
    </Provider>
  );
}
