import { RegisterButton } from "@/components/RegisterButton";
import styles from "./page.module.scss";

export default function SignUp() {
  return (
    <div className={styles.wrapper}>
      <form>
        <input name="email" placeholder="E-mail" />
        <input name="password" type="password" placeholder="Пароль" />
        <RegisterButton />
      </form>
    </div>
  );
}
