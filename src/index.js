import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./assets/fonts/OpenSans-Italic.ttf";
import { AuthContextProvider } from "./store/Auth-context";
import store from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <BrowserRouter basename="/english-learning-app">
        <App />
      </BrowserRouter>
    </Provider>
  </AuthContextProvider>
);
