import React, { useState } from 'react';
import './header.css';

const Header = () => {
    const [toggel ,setToggle] = useState (false);
  return (
    <div>
        <header className="header">

            <div className="header-left">
                <div className="header-logo">
                    <strong>BLOG</strong>
                    <i class="bi bi-pencil"></i>
                </div>
                <div className="header-menu" onClick={()=>setToggle(prev=>!prev)}>
                {toggel?<i className='bi bi-x-lg'></i>:<i class="bi bi-list"></i>}
                </div>
            </div>

            <nav className="navbar" style={{clipPath:toggel && "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}>
                <div className="nav-links">
                    <li className="nav-link" onClick={()=>setToggle(prev=>!prev)}>
                        <i class="bi bi-house-door-fill"></i> Home
                    </li>
                    <li className="nav-link" onClick={()=>setToggle(prev=>!prev)}>
                        <i class="bi bi-stickies"></i> Posts
                    </li>
                    <li className="nav-link" onClick={()=>setToggle(prev=>!prev)}>
                        <i class="bi bi-journal-plus"></i> Create
                    </li>
                    <li className="nav-link" onClick={()=>setToggle(prev=>!prev)}>
                        <i class="bi bi-person-check"></i> Admin Dashboard
                    </li>
                </div>
            </nav>

            <div className="header-right">
                <button className='header-right-link'>
                    <i class="bi bi-box-arrow-in-right"></i> 
                    <span>Login</span>
                </button>
                <button className='header-right-link'>
                    <i class="bi bi-person-plus"></i> 
                    <span>Register</span>
                </button>
            </div>

        </header>
    </div>
  )
}

export default Header