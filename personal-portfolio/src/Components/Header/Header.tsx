import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header flex justify-between items-center p-4">
      <div className="left-section flex items-center justify-center flex-1">
        <div className="name text-2xl font-bold bg-lightblue">
          Gabriel Castejon
        </div>
      </div>
      <div className="right-section flex-1">
        <nav className="navigation flex justify-center items-center">
          <ul className="nav-list flex justify-center items-center w-1/4">
            <li className="nav-item active flex-1">Home</li>
            <li className="nav-item flex-1">About</li>
            <li className="nav-item flex-1">Projects</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
