import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const baseLink =
    "text-2xl font-light tracking-wide transition-colors duration-200";
  const inactiveLink = "text-slate-300 hover:text-white";
  const activeLink = "text-white";

  const activeIndex = React.useMemo(() => {
    if (pathname.startsWith("/projects")) return 2;
    if (pathname.startsWith("/about")) return 1;
    return 0;
  }, [pathname]);

  const TAB_WIDTH_REM = 13; // w-52

  return (
    <header className="relative w-full h-28 overflow-hidden text-white">
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0b102a 0%, #101b47 40%, #0c1638 100%)",
        }}
      />

      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-12 -right-32 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex">
        {/* Name */}
        <div className="w-1/4 flex items-center justify-center">
          <div className="text-3xl font-semibold tracking-wide">
            Gabriel Castejon
          </div>
        </div>

        {/* Nav */}
        <div className="w-3/4 flex items-center justify-center">
          <nav className="relative flex items-start">
            {/* Sliding underline */}
            <div
              className="absolute top-0 left-0 h-1 bg-white/90 transition-transform duration-300 ease-in-out"
              style={{
                width: `${TAB_WIDTH_REM}rem`,
                transform: `translateX(${activeIndex * TAB_WIDTH_REM}rem)`,
              }}
            />

            {/* Tabs */}
            {[
              { to: "/", label: "Home", end: true },
              { to: "/about", label: "About" },
              { to: "/projects", label: "Projects" },
            ].map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink}`
                }
              >
                <div className="w-52 px-6 py-2 flex flex-col items-center">
                  {/* Spacer for underline */}
                  <div className="h-1 w-full" />
                  <span className="mt-3">{label}</span>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
