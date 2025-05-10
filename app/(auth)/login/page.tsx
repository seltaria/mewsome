"use client";

import Link from "next/link";
import { ValidatedInput } from "@/components/ValidatedInput";
import { loginFormSchema } from "@/utils/validation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

export default function Login() {
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const supabase = createClient();

  const signIn = async (formData: FormData) => {
    setWasSubmitted(true);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast("Неверный логин или пароль, попробуйте ещё раз");
      console.error("Error", error);
    } else {
      redirect("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form>
        <ValidatedInput
          name="email"
          placeholder="E-mail"
          errors=""
          fieldSchema={loginFormSchema.shape["email"]}
          wasSubmitted={wasSubmitted}
        />
        <ValidatedInput
          name="password"
          type="password"
          placeholder="Пароль"
          errors=""
          fieldSchema={loginFormSchema.shape["password"]}
          wasSubmitted={wasSubmitted}
        />

        <button type="submit" formAction={signIn}>
          Войти
        </button>
        <ToastContainer position="bottom-right" />
      </form>

      <Link className={styles.register} href="register">
        Зарегистрироваться
      </Link>
    </div>
  );
}
