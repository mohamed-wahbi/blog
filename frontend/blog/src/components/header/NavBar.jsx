import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({setToggle,toggel}) => {
  return (
    <nav
      className="navbar"
      style={{ clipPath: toggel && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="nav-links">
        <Link to='/' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-house-door-fill"></i> Home
        </Link>
        <Link to='/posts' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-stickies"></i> Posts
        </Link>
        <Link to='/posts/create-post' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-journal-plus"></i> Create
        </Link>
        <Link to='/admin-dashboard' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-person-check"></i> Admin Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
