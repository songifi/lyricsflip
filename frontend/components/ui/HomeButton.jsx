import { AiOutlineHome } from "react-icons/ai";

function HomeButton() {
  return (
    <a 
      href="/" 
      className="text-center rounded-lg border-2 border-primary-light hover:bg-primary-ligborder-primary-light hover:text-primary-main transition-colors duration-300 bottom-4 right-4 shadow-lg flex items-center gap-2 px-4 py-2"
    >
      <AiOutlineHome className="text-2xl" />
      <span className="text-[15px]">Home</span>
    </a>
  );
}

export default HomeButton;
