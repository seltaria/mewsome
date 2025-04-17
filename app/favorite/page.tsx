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
          <div>{decodeURIComponent(el.joke)}</div>
          <Image
            alt="cat"
            src={el.image_url}
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
}
