import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "@/plugins/supabase";

const AuthConfirm = () => {
  const navigate = useNavigate();

  // Handle magic link redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/", { replace: true });
      }
    });
  }, [navigate]);
  return <></>;
};

export default AuthConfirm;
