"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "../Loader";
import { createClient } from "@/utils/supabase/client";
import styles from "./FavoriteList.module.scss";
import { toast, ToastContainer } from "react-toastify";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "../Pagination";

export const FavoriteList = () => {
  const supabase = createClient();
  const [favorites, setFavorites] = useState<Record<string, string>[] | null>(
    null
  );
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const { currentPage, setPage } = usePagination();
  const CARDS_PER_PAGE = 8;
  const totalPages = totalCount ? Math.ceil(totalCount / CARDS_PER_PAGE) : 1;

  useEffect(() => {
    const getData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const { count } = await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", session!.user.id);

      const { data: favs } = await supabase
        .from("favorites")
        .select()
        .eq("user_id", session!.user.id)
        .range(
          (currentPage - 1) * CARDS_PER_PAGE,
          currentPage * CARDS_PER_PAGE - 1
        );

      setFavorites(favs);
      setTotalCount(count);
    };

    getData();
  }, [currentPage, supabase]);

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
    // TODO: loader при переходе между страницами
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
