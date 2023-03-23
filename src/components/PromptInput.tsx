import { useState, FormEvent, ChangeEvent } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChatResponse } from "./ChatResponse";

const queryClient = new QueryClient();

type CountVariable = 5 | 10 | 20 | 0;
type NamingConvention = "camelCase" | "PascalCase" | "snake_case" | "";

export default function PromptInput() {
  // const [inputValue, setInputValue] = useState("");
  const [countVariable, setCountVariable] = useState<CountVariable>(0);
  const [subject, setSubject] = useState<string>("");
  const [namingConvention, setNamingConvention] = useState<NamingConvention>("");
  const [promptValue, setPromptValue] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    queryClient.invalidateQueries("chatResponse");
    setPromptValue(
      `Create ${countVariable} ${subject} related variable names with ${namingConvention}`
    );
    //   if (inputValue !== "") {
    //     setPromptValue(inputValue);
    //   }
  };

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountVariable(e.target.value as CountVariable);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleNamingConventionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNamingConvention(e.target.value as NamingConvention);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <form onSubmit={handleSubmit}>
        {/* <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> */}

        <button type="submit">Submit</button>
      </form>
      {/* <ChatResponse prompt={`Create 10 게시판 related variable names with camelCase`} /> */}
      {promptValue && <ChatResponse prompt={promptValue} />}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
