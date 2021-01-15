import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { ROUTES } from "../../consts/index.js";

import LoginForm from "./LoginForm.js";
import Testenv from "../TestEnv/testenv.js"

const Authentication = () => {
  const { uiStore } = useStores();

  const history = useHistory();
  if (window.location.href.indexOf("apiKey") > -1) {
    uiStore.verifyLogin();
    history.push("login");
  }

  return useObserver(() => (
    <>
      <Switch>
        <Route path={ROUTES.login}>
          {uiStore.currentUser && uiStore.currentUser.name !== null ? (
            <Redirect to={ROUTES.home} />
          ) : (
              <Testenv />
          )}
        </Route>

        <Route exact path={ROUTES.home}>
          {uiStore.currentUser && uiStore.currentUser.name !== null ? (
            <>
              <p>aaa</p>
            </>
          ) : (
            <Redirect to={ROUTES.login} />
          )}
        </Route>

      </Switch>
    </>
  ));
};

export default Authentication;
