import React from "react";

const NavBar = (setToggle,toggel) => {
  return (
    <nav
      className="navbar"
      style={{ clipPath: toggel && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="nav-links">
        <li className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-house-door-fill"></i> Home
        </li>
        <li className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-stickies"></i> Posts
        </li>
        <li className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-journal-plus"></i> Create
        </li>
        <li className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-person-check"></i> Admin Dashboard
        </li>
      </div>
    </nav>
  );
};

export default NavBar;
