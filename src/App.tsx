import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppProviders from "@/components/AppProviders";
import theme from "@/theme";
import "./globals.css";

const Home = lazy(() => import("@/routes/Home"));
const GroupPage = lazy(() => import("@/routes/GroupPage"));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProviders>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/groups/:id" element={<GroupPage />} />
          </Routes>
        </Router>
        <CssBaseline />
      </AppProviders>
    </ThemeProvider>
  );
};

export default App;
