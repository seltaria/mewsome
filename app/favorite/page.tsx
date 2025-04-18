import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FavoriteList } from "@/components/FavoriteList";

export default async function FavoriteCats() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <FavoriteList />;
}
