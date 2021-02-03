import React from "react";
import Authentication from "./pages/Authentication/Authentication.js";
import { useObserver } from "mobx-react-lite";
import Person from "./pages/Profile/profile.js";
import Nav from "./components/Nav/nav.js";
import Home from "./pages/Home/home.js";

import { Route, Redirect} from "react-router-dom";
import { Switch } from "react-router";

function App() {

  return useObserver (() => (
    <div>
      <Nav />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/projecten">
            
          </Route>
          <Route path="/overons">

          </Route>

          <Route path="/startproject">

          </Route>

          <Route path="/profiel">
            <Person />
          </Route>

          {/* <Route path="/me">
            {isLoggedIn ?
            <Profile />
            :
            <Redirect to="/" />
            }
          </Route> */}

          {/* <Route path="/detail/:id">
            <Detail />
          </Route> */}
        </Switch>
      </div>
      
  
    </div>
  ));

  // return useObserver (() => (
  //   <>
  //   <Person/>
  //   </>
  // ));
}
export default App;