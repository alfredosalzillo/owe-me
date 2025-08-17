import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import React, { lazy, useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import supabase from "@/plugins/supabase";
import theme from "@/theme";

const Home = lazy(() => import("@/routes/Home"));
const GroupPage = lazy(() => import("@/routes/GroupPage"));
const Login = lazy(() => import("@/routes/Login"));
const AuthConfirm = lazy(() => import("@/routes/AuthConfirm"));
const AuthLogout = lazy(() => import("@/routes/AuthLogout"));

const Authorized: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }
      setAuthenticated(!!data.session);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }
      setAuthenticated(!!session);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return null;
  }
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogsProvider>
        <NotificationsProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/auth/confirm" element={<AuthConfirm />} />
              <Route path="/auth/logout" element={<AuthLogout />} />
              <Route
                index
                element={
                  <Authorized>
                    <Home />
                  </Authorized>
                }
              />
              <Route
                path="/groups/:id"
                element={
                  <Authorized>
                    <GroupPage />
                  </Authorized>
                }
              />
            </Routes>
          </Router>
        </NotificationsProvider>
      </DialogsProvider>
    </ThemeProvider>
  );
};

export default App;
