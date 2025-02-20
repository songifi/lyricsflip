import { AiOutlineHome } from "react-icons/ai";

function HomeButton() {
  return (
    <a 
      href="/" 
      className="text-center rounded-lg border-2 border-[#70E3C7] hover:bg-[#70E3C7] hover:text-[#490878] transition-colors duration-300 bottom-4 right-4 shadow-lg flex items-center gap-2 px-4 py-2"
    >
      <AiOutlineHome className="text-2xl" />
      <span className="text-[15px]">Home</span>
    </a>
  );
}

export default HomeButton;
