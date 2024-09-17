import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { store } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast />
    </Provider>
  );
};

export default App;
