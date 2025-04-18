"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "../Loader";
import { createClient } from "@/utils/supabase/client";
import styles from "./FavoriteList.module.scss";
import { toast, ToastContainer } from "react-toastify";

export const FavoriteList = () => {
  const supabase = createClient();
  const [favorites, setFavorites] = useState<Record<string, string>[] | null>(
    null
  );

  useEffect(() => {
    const getData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const { data: favs } = await supabase
        .from("favorites")
        .select()
        .eq("user_id", session!.user.id);

      setFavorites(favs);
    };

    getData();
  }, [supabase]);

  const handleDelete = async (id: string) => {
    const initialItems = favorites;
    setFavorites((prev) =>
      prev ? prev.filter((item) => item.id !== id) : null
    );

    const { error } = await supabase.from("favorites").delete().eq("id", id);

    if (error) {
      setFavorites(initialItems);
      toast("Ошибка удаления");
    }
  };

  if (!Array.isArray(favorites)) {
    return <Loader />;
  }

  return (
    <div className={styles.list}>
      {favorites.map((el) => (
        <div key={el.id} className={styles.post}>
          <button
            className={styles.button}
            onClick={() => handleDelete(el.id)}
            title="Удалить из избранного"
          >
            ×
          </button>
          <div className={styles.image}>
            <Image
              alt="cat"
              src={el.image_url}
              fill
              objectFit="contain"
              loading="lazy"
            />
          </div>
          <div className={styles.joke}>{decodeURIComponent(el.joke)}</div>
        </div>
      ))}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
