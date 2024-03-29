import { useState, FormEvent, ChangeEvent } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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

    if (subject !== "") {
      setPromptValue(
        `Create ${countVariable} ${subject} related variable names with ${namingConvention} in English`
      );
    } else {
      alert("변수 생성 관련 주제를 입력해주세요!");
    }
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
        <div className="flex flex-col justify-center items-center mb-10 sm:flex-row">
          <div className="variable-menu-container">
            <label htmlFor="count" className="text-gray-700 flex justify-center">
              Count
            </label>
            <select
              id="count"
              value={countVariable}
              onChange={handleCountChange}
              className="px-4 py-2 rounded-md shadow-sm outline-none bg-slate-100 dark:bg-zinc-800"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              {/* 20은 토큰수가 너무 많이 나와 삭제,,ㅠㅠ */}
              {/* <option value="20">20</option> */}
            </select>
          </div>

          <div className="variable-menu-container sm:ml-4">
            <label htmlFor="namingConvention" className="text-gray-700 flex justify-center">
              Naming Convention
            </label>
            <select
              id="namingConvention"
              value={namingConvention}
              onChange={handleNamingConventionChange}
              className="px-4 py-2 rounded-md shadow-sm outline-none bg-slate-100 dark:bg-zinc-800"
            >
              <option value="camelCase">🐪 camelCase</option>
              <option value="PascalCase">⚙️ PascalCase</option>
              <option value="snake_case">🐍 snake_case</option>
            </select>
          </div>

          <div className="variable-menu-container sm:ml-4">
            <label htmlFor="subject" className="text-gray-700 flex justify-center">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              autoComplete="off"
              placeholder="e.g. list, 게시판"
              className="px-4 py-2 rounded-md shadow-sm outline-none bg-slate-100 dark:bg-zinc-800"
            />
          </div>
        </div>

        <button type="submit" className="px-6 py-4 submit-button text-2xl ">
          생성하기
        </button>
      </form>
      {/* <ChatResponse prompt={`Create 10 게시판 related variable names with camelCase`} /> */}
      {promptValue && <ChatResponse prompt={promptValue} />}
    </QueryClientProvider>
  );
}
