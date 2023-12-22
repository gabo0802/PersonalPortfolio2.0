import React from "react";
import "./App.css";

import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="text-3xl underline">
          This is my personal portfolio website.
        </p>
      </header>
    </div>
  );
}

export default App;
