import React from "react";
import NavMenu from "./NavMenu";

const NavBar = () => {
  return (
    <header className="backdrop-blur-sm bg-primary-white/30 w-full sticky top-0 z-10 flex items-center justify-between px-16 py-6 border-b-2 border-gray-200">
      <h2 className="text-2xl text-primary-black font-bold">Channel.</h2>
      <NavMenu />
    </header>
  );
};

export default NavBar;
