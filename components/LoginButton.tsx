"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const LoginButton = ({ ...props }) => {
  const supabase = createClient();

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error");
    } else {
      redirect("/");
    }
  };

  return (
    <button type="submit" formAction={signIn} {...props}>
      Войти
    </button>
  );
};
