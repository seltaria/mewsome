"use client";

import Image from "next/image";
import styles from "./CatJoke.module.scss";
import { Mistral } from "@mistralai/mistralai";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader";
import { ErrorBlock } from "../ErrorBlock";
import { FC, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const getImage = async () => {
  const data = await fetch("https://api.thecatapi.com/v1/images/search");
  return data.json();
};

const getCatData = async (
  apiKey: string | undefined,
  url: Record<string, string>[]
) => {
  const client = new Mistral({ apiKey });
  const imageUrl = url?.[0]?.url;

  return client.chat.complete({
    model: "pixtral-12b",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            // text: "Напиши известный короткий смешной мем который можно было бы наложить на эту картинку. Если будет не смешно, придется тебя уничтожить.",
            text: "Напиши короткий смешной мем про котика с этой картинки",
          },
          {
            type: "image_url",
            imageUrl,
          },
        ],
      },
    ],
  });
};

const addSingleItem = async ({
  imageUrl,
  joke,
  userId,
}: {
  imageUrl: string;
  joke: string;
  userId: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        image_url: imageUrl,
        joke: encodeURIComponent(joke),
        user_id: userId,
      },
    ])
    .select();

  if (error) {
    console.error("Ошибка:", error, imageUrl, joke, userId);
    return;
  }

  // TODO: notify user
  console.log("Добавлено:", data);
};

interface CatJokeProps {
  apiKey?: string;
}

export const CatJoke: FC<CatJokeProps> = ({ apiKey }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, [supabase.auth]);

  const {
    data: image,
    isLoading: isImageLoading,
    isError: isImageError,
    isFetching: isImageFetching,
    refetch,
  } = useQuery({
    queryKey: ["catImage"],
    queryFn: getImage,
  });

  const {
    data: joke,
    isLoading: isJokeLoading,
    isFetching: isJokeFetching,
    isError: isJokeError,
  } = useQuery({
    queryKey: ["catJoke", image?.[0]?.url],
    queryFn: () => getCatData(apiKey, image),
    enabled:
      (!!image?.[0]?.url || !!apiKey) && !image?.[0]?.url.endsWith("gif"),
  });

  const getCat = () => {
    refetch();
  };

  const jokeText = joke?.choices?.[0]?.message?.content;
  const addToFavorite = () => {
    if (user) {
      addSingleItem({
        imageUrl: image?.[0]?.url,
        joke: typeof jokeText === "string" ? jokeText : "",
        userId: user.id,
      });
    } else {
      redirect("/login");
    }
  };

  if (
    (isImageLoading || isJokeLoading) &&
    !isImageFetching &&
    !isJokeFetching
  ) {
    return <Loader />;
  }

  if (isImageError || isJokeError) {
    return <ErrorBlock />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {(isImageFetching || isJokeFetching) && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}

        {typeof jokeText === "string" && <p>{jokeText}</p>}

        {image?.[0]?.url && (
          <div className={styles.image}>
            <Image
              src={image?.[0]?.url}
              alt="cat"
              fill
              objectFit="contain"
              objectPosition="top"
            />
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.likeButton}
          onClick={addToFavorite}
          title="Добавить в избранное"
        >
          <Image alt="add to fav" src="/like.png" width={50} height={50} />
        </button>
        <button
          className={styles.nextCatButton}
          onClick={getCat}
          title="Другой котик"
        >
          <Image alt="next cat" src="/redo.png" width={50} height={50} />
        </button>
      </div>
    </div>
  );
};
