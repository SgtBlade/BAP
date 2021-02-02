import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, /*Redirect, */ } from "react-router-dom";
import { ROUTES } from "../../consts/index.js";
import Testenv from "../TestEnv/testenv.js"
import PasswordResetForm from "../F_PasswordResetForm/passwordResetForm";

const Authentication = () => {
  const { uiStore } = useStores();
  //REMOVE
  uiStore.test();

  return useObserver(() => (
    <>
      <Switch>

      <Route path={ROUTES.home}>
        <Testenv />
      </Route>


      <Route path={ROUTES.reset}>
        <PasswordResetForm />
      </Route>


      </Switch>
    </>
  ));

  /*
        <Route path={ROUTES.login}>
          {uiStore.currentUser && uiStore.currentUser.name !== null ? (
            <Redirect to={ROUTES.home} />
          ) : (
              <Testenv />
          )}
        </Route>
        */
};

export default Authentication;
