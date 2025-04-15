import Image from "next/image";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Image alt="loading..." src="/loading_cat.png" width={200} height={200} />
      <div>Loading...</div>
    </div>
  );
};
