import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>Добро пожаловать</div>
      <Image alt="cat welcome" src="/welcome.png" width={300} height={300} />
      <div>
        На этом сайте можно посмотреть на{" "}
        <Link href="/random">
          случайного котика с искусственноинтеллектуальной шуткой
        </Link>{" "}
        и <Link href="/favorite">посмотреть на своих избранных котиков</Link>
      </div>
    </div>
  );
}
