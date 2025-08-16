import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import React, { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import theme from "@/theme";

const Home = lazy(() => import("@/routes/Home"));
const GroupPage = lazy(() => import("@/routes/GroupPage"));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogsProvider>
        <NotificationsProvider>
          <Router>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/groups/:id" element={<GroupPage />} />
            </Routes>
          </Router>
        </NotificationsProvider>
      </DialogsProvider>
    </ThemeProvider>
  );
};

export default App;
