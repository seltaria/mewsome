"use client";

import Link from "next/link";
import styles from "./Navigation.module.scss";
import { LogoutButton } from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", name: "Главная", auth: null },
  { href: "/random", name: "Случайный кот", auth: null },
  { href: "/favorite", name: "Избранное", auth: true },
];

export const Navigation = () => {
  const supabase = createClient();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session ? session.user : null);
    });
  }, [supabase]);

  console.log({ pathname });

  return (
    <nav className={styles.nav}>
      {links.map(
        (el) =>
          ((!!currentUser && el.auth) || el.auth === null) && (
            <Link
              className={clsx(pathname === el.href && styles.active)}
              key={el.href}
              href={el.href}
            >
              {el.name}
            </Link>
          )
      )}
      {!!currentUser && <LogoutButton />}
      {!currentUser && (
        <Link
          href="/login"
          className={clsx(pathname === "/login" && styles.active)}
        >
          Войти
        </Link>
      )}
    </nav>
  );
};
