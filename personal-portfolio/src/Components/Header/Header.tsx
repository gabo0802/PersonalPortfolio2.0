import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  // IMPORTANT: remove px-6/py-2 from NavLink itself
  const baseLink =
    "text-2xl font-light tracking-wide transition-colors duration-200";
  const inactiveLink = "text-slate-500 hover:text-slate-700";
  const activeLink = "text-slate-800";

  const activeIndex = React.useMemo(() => {
    if (pathname.startsWith("/projects")) return 2;
    if (pathname.startsWith("/about")) return 1;
    return 0;
  }, [pathname]);

  const TAB_WIDTH_REM = 13; // w-52

  return (
    <header className="w-full h-28 flex border-b border-black">
      {/* Left */}
      <div className="w-1/4 bg-[#4f8797] flex items-center justify-center">
        <div className="text-3xl font-semibold text-black">
          Gabriel Castejon
        </div>
      </div>

      {/* Right */}
      <div className="w-3/4 bg-[#d6d6d1] flex items-center justify-center">
        <nav className="relative flex items-start">
          {/* Sliding underline */}
          <div
            className="absolute top-0 left-0 h-1 bg-black transition-transform duration-300 ease-in-out"
            style={{
              width: `${TAB_WIDTH_REM}rem`,
              transform: `translateX(${activeIndex * TAB_WIDTH_REM}rem)`,
            }}
          />

          {/* Tabs */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <div className="w-52 px-6 py-2 flex flex-col items-center">
              <div className="h-1 w-full" />
              <span className="mt-3">Home</span>
            </div>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <div className="w-52 px-6 py-2 flex flex-col items-center">
              <div className="h-1 w-full" />
              <span className="mt-3">About</span>
            </div>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <div className="w-52 px-6 py-2 flex flex-col items-center">
              <div className="h-1 w-full" />
              <span className="mt-3">Projects</span>
            </div>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
