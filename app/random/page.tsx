import { CatJoke } from "@/components/CatJoke";

export default async function RandomCat() {
  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  return (
    <div>
      <CatJoke apiKey={MISTRAL_API_KEY} />
    </div>
  );
}

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
