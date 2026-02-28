import React from "react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-slate-300">
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0b102a 0%, #101b47 40%, #0c1638 100%)",
        }}
      />

      {/* Subtle blob */}
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[4.5rem] px-4 py-3">
        <div className="text-xs md:text-sm tracking-wide text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Gabriel Castejon</span>
        </div>
      </div>
    </footer>
  );
}
