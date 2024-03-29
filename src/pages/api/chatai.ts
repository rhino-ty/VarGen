import axios from "axios";

interface ChatResponseData {
  resText: string;
  resId: string;
}

export const getChatResponse = async (prompt: string): Promise<ChatResponseData> => {
  // 다빈치 사용
  // const response = await axios.post(
  //   "https://api.openai.com/v1/completions",
  //   {
  //     model: "text-davinci-003",
  //     prompt,
  //     temperature: 0.9,
  //     max_tokens: 100,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0.6,
  //     stop: [" Human:", " AI:"],
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API}`,
  //     },
  //   }
  // );
  // const resText = response.data.choices[0].text;
  // const resId = response.data.id;

  // gpt 3.5 터보 사용
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 100,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API}`,
      },
    }
  );
  const resText = response.data.choices[0].message.content;
  const resId = response.data.id;

  return { resText, resId };
};
