import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "@/plugins/supabase";

const AuthLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      navigate("/login", { replace: true });
    });
  }, [navigate]);
  return <></>;
};

export default AuthLogout;
