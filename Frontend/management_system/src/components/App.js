import React from "react";
import Main from "./Main";
import Navigation from "./Navigation";
import Schedule from "./Schedule";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  return (
    <React.Fragment>
      <Navigation isLoggedIn={true} />
      <Main />
    </React.Fragment>
  );
}

export default App;
