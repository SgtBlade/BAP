import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, /*Redirect, */ } from "react-router-dom";
import { ROUTES } from "../../consts/index.js";
import Testenv from "../TestEnv/testenv.js"
import PasswordResetForm from "../F_PasswordResetForm/passwordResetForm";
import Person from "../Profile/profile.js";
import Nav from "../../components/Nav/nav";
import Home from "../Home/home.js";

const Authentication = () => {

  return useObserver(() => (
    <>
      <Nav />
      <div>
        <Switch>
          
          <Route path={ROUTES.home}>
            <Testenv/>
            <Home/>
          </Route>

          <Route exact path={ROUTES.projecten}>
            {console.log('test')}
            
          </Route>
          <Route exact path={ROUTES.overons}>

          </Route>

          <Route exact path={ROUTES.startproject}>

          </Route>

          <Route exact path={ROUTES.profiel}>
            <Person />
          </Route>

          <Route exact path={ROUTES.reset}>
            <PasswordResetForm />
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
      
    </>
  ));

};

export default Authentication;
