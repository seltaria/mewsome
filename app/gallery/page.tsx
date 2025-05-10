import { FavoriteList } from "@/components/FavoriteList";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import styles from "./page.module.scss";

export default async function CatsGallery() {
  return (
    <>
      <div className={styles.description}>
        Здесь хранятся все котики, с любовью добавленные в избранное нашими
        пользователями. Для любования, восхищения и скачивания
      </div>
      <FavoriteList open />
      <ScrollToTopButton />
    </>
  );
}
