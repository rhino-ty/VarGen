import { useState, FormEvent, ChangeEvent } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChatResponse } from "./ChatResponse";

const queryClient = new QueryClient();

type CountVariable = 5 | 10 | 20;
type NamingConvention = "camelCase" | "PascalCase" | "snake_case";

export default function PromptInput() {
  // const [inputValue, setInputValue] = useState("");
  const [countVariable, setCountVariable] = useState<CountVariable>(10);
  const [subject, setSubject] = useState<string>("");
  const [namingConvention, setNamingConvention] = useState<NamingConvention>("camelCase");
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

  const handleCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountVariable(parseInt(e.target.value) as CountVariable);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleNamingConventionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNamingConvention(e.target.value as NamingConvention);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center my-5">
        <h1 className="text-6xl">VarGen</h1>
        <h3 className="text-3xl mt-5">변수를 생성해보세요!</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        {/* <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> */}
        <div className="flex flex-row justify-center items-center space-x-4 mb-10">
          <div className="flex flex-col">
            <label htmlFor="count" className="text-gray-700 flex justify-center">
              Count
            </label>
            <select
              id="count"
              value={countVariable}
              onChange={handleCountChange}
              className="px-4 py-2 rounded-md shadow-sm outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="subject" className="text-gray-700 flex justify-center">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              className="px-4 py-2 rounded-md shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="namingConvention" className="text-gray-700 flex justify-center">
              Naming Convention
            </label>
            <select
              id="namingConvention"
              value={namingConvention}
              onChange={handleNamingConventionChange}
              className="px-4 py-2  rounded-md shadow-sm outline-none"
            >
              <option value="camelCase">🐪 camelCase</option>
              <option value="PascalCase">⚙️ PascalCase</option>
              <option value="snake_case">🐍 snake_case</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-14 py-2 submit-button ">
          제출
        </button>
      </form>
      {/* <ChatResponse prompt={`Create 10 게시판 related variable names with camelCase`} /> */}
      {promptValue && <ChatResponse prompt={promptValue} />}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
