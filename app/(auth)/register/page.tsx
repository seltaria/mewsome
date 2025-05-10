"use client";

import styles from "./page.module.scss";
import Link from "next/link";
import { ValidatedInput } from "@/components/ValidatedInput";
import { loginFormSchema } from "@/utils/validation";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const supabase = createClient();

  const register = async (formData: FormData) => {
    setWasSubmitted(true);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast("Проверьте, что все поля заполнены корректно");
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

        <button type="submit" formAction={register}>
          Зарегистрироваться
        </button>
        <ToastContainer position="bottom-right" />
      </form>

      <Link className={styles.login} href="login">
        Есть аккаунт?
      </Link>
    </div>
  );
}
