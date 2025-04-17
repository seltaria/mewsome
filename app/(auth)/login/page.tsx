import { LoginButton } from "@/components/LoginButton";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <form>
        <input name="email" placeholder="E-mail" />
        <input name="password" type="password" placeholder="Пароль" />
        <LoginButton />
      </form>
      <Link href="register">Зарегистрироваться</Link>
    </div>
  );
}
