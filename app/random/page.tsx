import Image from "next/image";
import { Mistral } from "@mistralai/mistralai";

const fetchCat = async () => {
  const data = await fetch("https://api.thecatapi.com/v1/images/search");
  const cats = await data.json();
  console.log({ cats });
  const catData = cats?.[0];

  return catData;
};

export default async function RandomCat() {
  const cat = await fetchCat();
  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  const client = new Mistral({ apiKey: MISTRAL_API_KEY });

  const chatResponse = await client.chat.complete({
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
            imageUrl: cat,
          },
        ],
      },
    ],
  });
  const catJoke = chatResponse?.choices?.[0]?.message?.content;

  // TODO: chat
  // const API_URL = "https://api.mistral.ai/v1/chat/completions";
  // const a = await fetch(API_URL, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${MISTRAL_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     model: "mistral-small-latest",
  //     messages: [
  //       {
  //         role: "user",
  //         content: "A short funny joke or fact about cat",
  //       },
  //     ],
  //   }),
  // });
  // const chat = await a.json();

  console.log({ catJoke });

  if (!cat) {
    return <div>No cat ,_,</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        maxWidth: "600px",
        padding: "20px",
        margin: "30px auto",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {typeof catJoke === "string" && <p>{catJoke}</p>}
      <div style={{ position: "relative", width: "400px", height: "400px" }}>
        <Image
          src={cat.url}
          alt="cat"
          fill
          objectFit="contain"
          objectPosition="top"
        />
      </div>
      {/* <button>Get cat</button> */}
    </div>
  );
}
