"use client";

import Link from "next/link";
import styles from "./Navigation.module.scss";
import { LogoutButton } from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export const Navigation = () => {
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session ? session.user : null);
    });
  }, [supabase]);

  return (
    <nav className={styles.nav}>
      <Link href="/">Главная</Link>
      <Link href="random">Случайный кот</Link>
      {!!currentUser && <Link href="favorite">Избранное</Link>}
      {!!currentUser && <LogoutButton />}
      {!currentUser && <Link href="login">Войти</Link>}
    </nav>
  );
};
