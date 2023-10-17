import React from "react";
import Main from "./Main";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
