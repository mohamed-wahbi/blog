import React from "react";

const HeaderLeft = (toggel, setToggle) => {
  return (
    <div className="header-left">
      <div className="header-logo">
        <strong>BLOG</strong>
        <i class="bi bi-pencil"></i>
      </div>
      <div className="header-menu" onClick={() => setToggle((prev) => !prev)}>
        {toggel ? <i className="bi bi-x-lg"></i> : <i class="bi bi-list"></i>}
      </div>
    </div>
  );
};

export default HeaderLeft;
