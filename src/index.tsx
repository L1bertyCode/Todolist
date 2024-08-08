import { createRoot } from "react-dom/client";
import "./index.css";
import AppWithReducers from "./app/AppWithReducers";
import App from "./app/App";
import { Provider } from "react-redux";
import AppWithRedux from "./app/AppWithRedux";
import { store } from "./state/store";

const root = createRoot(document.getElementById("root"));
root.render(
 <Provider store={store}>
  <AppWithRedux />
 </Provider>
);
