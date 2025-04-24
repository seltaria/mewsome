"use client";

import Image from "next/image";
import styles from "./MemeCard.module.scss";
import { FC, useRef } from "react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { DownloadIcon } from "../icons";

type MemeCardProps = {
  id: string;
  imageUrl: string;
  joke: string;
  handleDelete: (id: string) => void;
};

export const MemeCard: FC<MemeCardProps> = ({
  id,
  imageUrl,
  joke,
  handleDelete,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ref.current) return;

    try {
      const canvas = await html2canvas(ref.current);
      const dataUrl = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.download = `catmeme_${id}.jpg`;
      link.href = dataUrl;
      link.click();
      toast("Ваш котик скачался");
    } catch (error) {
      console.error("Error converting div to JPEG:", error);
      toast("Ошибка скачивания");
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.deleteButton}
        onClick={() => handleDelete(id)}
        title="Удалить из избранного"
      >
        ×
      </button>
      <div className={styles.post} ref={ref}>
        <div className={styles.image}>
          <Image
            alt="cat"
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            priority={false}
          />
        </div>
        <div className={styles.joke}>{decodeURIComponent(joke)}</div>
      </div>
      <button
        className={styles.downloadButton}
        onClick={handleDownload}
        title="Скачать картинку"
      >
        <DownloadIcon size={12} />
      </button>
    </div>
  );
};
