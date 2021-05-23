import * as React from "react";

import { AppRegistry } from "react-native";
import Main from "./main";
import store from "./redux/store";
import { Provider as StoreProvider } from "react-redux";

const App = () => {
  return (
    <StoreProvider store={store}>
      <Main />
    </StoreProvider>
  );
};

export default App;

AppRegistry.registerComponent("Network", () => App);
