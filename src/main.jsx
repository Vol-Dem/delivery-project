import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "./index.scss";
import App from "./App";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MotionConfig>
  </React.StrictMode>,
);
