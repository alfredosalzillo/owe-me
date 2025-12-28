import { Box, CircularProgress } from "@mui/material";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import supabase from "@/plugins/supabase/client";

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
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!authenticated) {
    return (
      <Navigate
        to={`/login?returnUrl=${encodeURIComponent(window.location.href)}`}
        replace
      />
    );
  }
  return <>{children}</>;
};

const PrivateLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <Authorized>{children}</Authorized>
);

export default PrivateLayout;
