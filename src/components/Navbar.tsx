import { useEffect, useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setShowMenu(window.innerWidth > 640);
    window.matchMedia("(min-width: 640px)").addEventListener("change", () => {
      {
        setWidth(window.innerWidth);
      }
    });
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setShowMenu(width > 640);
  }, [width]);
  return (
    <nav className="w-full bg-gray-400 h-20 flex justify-between items-center">
      <img src="./logo.svg" alt="" width="100" />
      <ul
        className={`justify-around w-1/3 ${showMenu ? "flex" : "hidden"} ${
          width < 640 &&
          "absolute top-20 right-0 bg-gray-300 bg-opacity-90 h-64 w-2/3 flex-col"
        }`}
      >
        <li className="p-3 ">
          <a href="#home">Home</a>
        </li>
        <li className="p-3 ">
          <a href="#about">About</a>
        </li>
        <li className="p-3 ">
          <a href="#history">History</a>
        </li>
        <li className="p-3 ">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <ul className="sm:flex hidden">
        <li>
          <img src="./envelope.svg" alt="Email" />
        </li>
        <li>
          <img src="./geo-alt-fill.svg" alt="Address" />
        </li>
        <li>
          <img src="./telephone-fill.svg" alt="Phone" />
        </li>
      </ul>
      <button
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <img
          src="./list.svg"
          alt="Menu"
          className="pr-5 cursor-pointer block sm:hidden"
        />
      </button>
    </nav>
  );
};

export default Navbar;
