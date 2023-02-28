import axios from "axios";

interface ChatResponseData {
  resText: string;
  resId: string;
}

export const getChatResponse = async (prompt: string): Promise<ChatResponseData> => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        temperature: 0.9,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API}`,
        },
      }
    );
    const resText = response.data.choices[0].text;
    const resId = response.data.id;
    return { resText, resId };
  } catch (error) {
    console.error(`Error in getChatResponse: ${error}`);
    throw new Error("Unable to generate chat response");
  }
};
