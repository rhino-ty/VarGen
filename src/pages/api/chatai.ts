import axios from "axios";

export const chatAi = async (data: string) => {
  try {
    // axios를 이용해서 chatgpt와 통신
    const pos = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `${data}`,
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
          Authorization: "Bearer " + String(process.env.NEXT_PUBLIC_OPEN_API),
        },
      }
    );
  } catch (error) {
    console.log(error);
    alert("오류가 발생하였습니다.");
  }
};
