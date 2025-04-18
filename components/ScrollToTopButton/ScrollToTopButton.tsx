"use client";

import Image from "next/image";
import styles from "./ScrollToTopButton.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={clsx(styles.button, !isVisible && styles.invisible)}
      onClick={scrollToTop}
    >
      <Image alt="arrow" src="/arrow_up.svg" width={30} height={30} />
    </button>
  );
};
