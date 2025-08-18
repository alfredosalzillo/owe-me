import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "vite-plugin-react-app-router/router";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
