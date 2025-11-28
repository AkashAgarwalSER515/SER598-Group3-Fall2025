import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";
import { LearningProvider } from "./context/LearningContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LearningProvider>
      <App />
      </LearningProvider>
    </BrowserRouter>
  </React.StrictMode>
);