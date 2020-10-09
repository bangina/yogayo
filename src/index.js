import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./redux/index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import ReduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, ReduxThunk))
);
const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#333",
      white: "#fff",
    },
    primary: {
      main: "#cf556c",
      contrastText: "#fff",
      mainGradient:
        "linear-gradient(to bottom, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #cf556c 100%)",
    },
    secondary: {
      main: "#f99185",
    },
    button: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 2.5,
    },
  },
  typography: {
    fontFamily: [
      "Noto Sans KR",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>{" "}
  </Provider>,
  document.getElementById("root")
);
