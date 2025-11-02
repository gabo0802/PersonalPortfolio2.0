import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const linkClasses =
    "flex-1 text-center transition-colors duration-200 hover:text-blue-400";

  const activeClasses = "text-blue-500 font-semibold border-b-2 border-blue-500";

  return (
    <header className="header flex justify-between items-center p-4 border-b border-gray-200">
      {/* Left section */}
      <div className="left-section flex items-center justify-center flex-1">
        <div className="name text-2xl font-bold text-blue-500">
          Gabriel Castejon
        </div>
      </div>

      {/* Right section */}
      <div className="right-section flex-1">
        <nav className="navigation flex justify-center items-center">
          <ul className="nav-list flex justify-between gap-8">
            <li className="nav-item flex-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item flex-2">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                About Me
              </NavLink>
            </li>
            <li className="nav-item flex-1">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Projects
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
