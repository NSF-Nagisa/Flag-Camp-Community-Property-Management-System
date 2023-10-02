import React from 'react';
import Main from './Main';
import Navigation from './Navigation';
import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn.value);
  return (
    <React.Fragment>
      <Navigation isLoggedIn={isLoggedIn}/>
      <Main/>
    </React.Fragment>
  );
}

export default App;
