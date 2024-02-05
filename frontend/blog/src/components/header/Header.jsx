import React, { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import NavBar from "./NavBar";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const [toggel, setToggle] = useState(false);
  return (
    <div>
      <header className="header">
        <HeaderLeft toggel={toggel} setToggle={setToggle} />

        <NavBar toggel={toggel} setToggle={setToggle} />

        <HeaderRight />
      </header>
    </div>
  );
};

export default Header;
