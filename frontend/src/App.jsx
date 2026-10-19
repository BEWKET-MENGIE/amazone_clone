import React, { useEffect, useContext } from 'react';
import './App.css';
import Routing from './Routing';
import { DataContext } from "./Component/DataProvider/DataProvider";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/firebase.js";

function App() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;