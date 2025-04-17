"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const LogoutButton = ({ ...props }) => {
  const supabase = createClient();
  const logout = async () => {
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <button onClick={logout} {...props}>
      Выйти
    </button>
  );
};
