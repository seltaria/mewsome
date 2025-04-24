import Image from "next/image";
import styles from "./ErrorBlock.module.scss";

export const ErrorBlock = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        alt="error"
        src="/error_cat.png"
        width={200}
        height={200}
        priority
      />
      <div>Error ,_,</div>
    </div>
  );
};
