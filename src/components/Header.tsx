import Image from "next/image";
import rhino from "../../public/Rhino.jpg";
import DarkModeToggleButton from "./DarkModeToggleButton";

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        <a className="flex items-center justify-center hN">
          <Image
            src={rhino}
            alt="Rhino"
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover object-center hover:brightness-75"
          />
          <span className="ml-3 text-xl">나만의 개발 잡동사니</span>
        </a>
        <div className="flex items-center justify-center md:justify-end">
          <DarkModeToggleButton />
        </div>
      </div>
    </header>
  );
}
