"use client";

import styles from "./ScrollToTopButton.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowIcon } from "../icons";

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
      <ArrowIcon size={30} />
    </button>
  );
};
