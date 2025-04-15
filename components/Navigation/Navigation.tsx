import Link from "next/link";
import styles from "./Navigation.module.scss";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">Main</Link>
      <Link href="random">Random Cat</Link>
      <Link href="clicker">Clicker Game</Link>
    </nav>
  );
};
