import  { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0b2e33] text-white px-4 py-2 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="max-w-[37px]"
            src="/src/assets/todo-logo.png"
            alt="Logo"
          />
          <h1 className="text-[26px] font-bold">TASKIFY</h1>
        </div>

        {/* Desktop Menu (Always Bold) */}
        <ul className="hidden md:flex gap-10 text-lg text-[25px] font-bold">
          <li className="cursor-pointer hover:underline transition-all duration-100">
            Home
          </li>
          <li className="cursor-pointer hover:underline transition-all duration-100">
            My Lists
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute right-2 top-full bg-[#0b2e33] border border-gray-600 rounded-md py-2 px-3 flex flex-col items-start gap-2 md:hidden z-50 w-fit min-w-[120px]">
          <li className="list-none cursor-pointer hover:font-bold transition-all duration-100 text-sm w-full">
            Home
          </li>
          <li className="list-none cursor-pointer hover:font-bold transition-all duration-100 text-sm w-full">
            My Lists
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
