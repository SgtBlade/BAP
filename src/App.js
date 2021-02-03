import React from "react";
import Authentication from "./pages/Authentication/Authentication.js";
import { useObserver } from "mobx-react-lite";

function App() {

  return useObserver (() => (
    <>
     <Authentication/>
    </>
  ));
}
export default App;