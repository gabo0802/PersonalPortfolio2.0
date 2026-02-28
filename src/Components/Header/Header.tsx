import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const [desktopUnderlineStyle, setDesktopUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const baseLink =
    "text-2xl font-light tracking-wide transition-colors duration-200";
  const inactiveLink = "text-slate-300 hover:text-white";
  const activeLink = "text-white";

  const isTabActive = (to: string, end?: boolean) => {
    if (to === "/") return pathname === "/";
    if (end) return pathname === to;
    return pathname.startsWith(to);
  };

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
  ];

  useEffect(() => {
    const updateDesktopUnderline = () => {
      const navContainer = desktopNavRef.current;
      if (!navContainer) return;

      const activeItem = navContainer.querySelector<HTMLElement>(
        ".desktop-nav-item-active",
      );
      const activeLabel = activeItem?.querySelector<HTMLElement>(
        ".desktop-nav-label",
      );

      if (!activeItem || !activeLabel) {
        setDesktopUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const nextWidth = activeLabel.offsetWidth;
      const nextLeft =
        activeItem.offsetLeft + (activeItem.offsetWidth - nextWidth) / 2;

      setDesktopUnderlineStyle({
        left: nextLeft,
        width: nextWidth,
        opacity: 1,
      });
    };

    updateDesktopUnderline();
    window.addEventListener("resize", updateDesktopUnderline);

    return () => {
      window.removeEventListener("resize", updateDesktopUnderline);
    };
  }, [pathname]);

  return (
    <header className="relative w-full h-20 md:h-28 overflow-visible md:overflow-hidden text-white">
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
      <div className="relative z-10 h-full w-full flex flex-col md:flex-row">
        {/* Name */}
        <div className="w-full h-full md:h-auto md:w-1/4 flex items-center justify-between md:justify-center px-4 md:px-0">
          <div className="text-xl md:text-3xl font-semibold tracking-wide text-center px-3 md:-translate-y-1">
            Gabriel Castejon
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-md text-white p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav */}
        <div className="hidden md:flex w-full md:w-3/4 items-center justify-center pb-3 md:pb-0">
          <nav
            ref={desktopNavRef}
            className="no-scrollbar relative w-full md:w-auto flex items-start justify-center overflow-x-auto px-3 md:px-0"
          >

            {/* Tabs */}
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink}`
                }
              >
                <div
                  className={`min-w-[7rem] md:w-52 px-4 md:px-6 py-2 flex flex-col items-center ${
                    isTabActive(to, end) ? "desktop-nav-item-active" : ""
                  }`}
                >
                  <span className="desktop-nav-label mt-2 md:mt-3 pb-1">
                    {label}
                  </span>
                </div>
              </NavLink>
            ))}

            <span
              className="pointer-events-none absolute bottom-[10px] h-[2px] bg-white"
              style={{
                left: desktopUnderlineStyle.left,
                width: desktopUnderlineStyle.width,
                opacity: desktopUnderlineStyle.opacity,
                transitionProperty: "left, width, opacity",
                transitionDuration: "360ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              aria-hidden="true"
            />
          </nav>
        </div>

        <div
          className={`md:hidden absolute left-0 right-0 top-full z-30 pt-2 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="w-full">
            <nav
              className="w-full rounded-b-xl bg-blue-950/40 backdrop-blur-md py-2 shadow-lg shadow-blue-950/35"
              aria-label="Mobile navigation"
            >
              {navItems.map(({ to, label, end }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={end}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full px-5 py-3 text-base font-medium text-center transition-colors ${
                    isTabActive(to, end)
                      ? "text-white bg-blue-300/20"
                      : "text-slate-300 hover:text-white hover:bg-blue-300/12"
                  }`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
