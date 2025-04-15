"use client";

import Image from "next/image";
import styles from "./CatJoke.module.scss";
import { Mistral } from "@mistralai/mistralai";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader";
import { ErrorBlock } from "../ErrorBlock";
import { FC } from "react";

const getImage = async () => {
  const data = await fetch("https://api.thecatapi.com/v1/images/search");
  return data.json();
};

const getCatData = async (apiKey: string, url: Record<string, string>[]) => {
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

interface CatJokeProps {
  apiKey?: string;
}

export const CatJoke: FC<CatJokeProps> = ({ apiKey }) => {
  const {
    data: image,
    isLoading: isImageLoading,
    isError: isImageError,
    refetch,
  } = useQuery({
    queryKey: ["catImage"],
    queryFn: getImage,
  });

  const {
    data: joke,
    isLoading: isJokeLoading,
    isError: isJokeError,
  } = useQuery({
    queryKey: ["catJoke", image?.[0]?.url],
    queryFn: () => getCatData(apiKey, image),
    enabled: !!image?.[0]?.url || !!apiKey,
  });

  const getCat = () => {
    refetch();
  };

  if (isImageLoading || isJokeLoading) {
    return <Loader />;
  }

  if (isImageError || isJokeError) {
    return <ErrorBlock />;
  }

  return (
    <div className={styles.wrapper}>
      {joke && <p>{joke.choices?.[0]?.message?.content}</p>}
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
      <button onClick={getCat}>Get cat</button>
    </div>
  );
};
