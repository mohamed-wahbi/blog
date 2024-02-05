import React from "react";

const HeaderRight = () => {
  return (
    <div className="header-right">
      <button className="header-right-link">
        <i class="bi bi-box-arrow-in-right"></i>
        <span>Login</span>
      </button>
      <button className="header-right-link">
        <i class="bi bi-person-plus"></i>
        <span>Register</span>
      </button>
    </div>
  );
};

export default HeaderRight;
