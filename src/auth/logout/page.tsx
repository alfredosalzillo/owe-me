import { useEffect } from "react";
import { useNavigate } from "react-router";
import { route } from "@/plugins/app-router-helpers";
import supabase from "@/plugins/supabase/client";

const AuthLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      navigate(route("/login", {}), { replace: true });
    });
  }, [navigate]);
  return <></>;
};

export default AuthLogout;
