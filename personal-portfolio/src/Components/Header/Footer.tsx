import React from "react";

function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 border-t border-gray-200">
      <div className="text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-blue-500">
          Gabriel Castejon
        </span>
      </div>
    </footer>
  );
}

export default Footer;
