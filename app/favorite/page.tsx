import { Loader } from "@/components/Loader";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

export default async function FavoriteCats() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: favs } = await supabase
    .from("favorites")
    .select()
    .eq("user_id", session.user.id);

  if (!Array.isArray(favs)) {
    return <Loader />;
  }

  return (
    <div className={styles.list}>
      {favs.map((el) => (
        <div key={el.id} className={styles.post}>
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
    </div>
  );
}
