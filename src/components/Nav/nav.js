import React from "react";
import { useStores } from "../../hooks/useStores";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";

import style from "./nav.module.css";
import { useObserver } from "mobx-react-lite";

const Nav = () => {
  const { uiStore } = useStores();

  return useObserver(() => (
    <nav className={style.nav}>
      <NavLink
        exact
        className={`${style.link} ${style.logoLink}`}
        activeClassName={style.active}
        to={ROUTES.home}
      >
        <img src="/assets/logo.svg" alt="DURF2030 logo" />
      </NavLink>
      <ul className={style.nav__links}>
        <li>
          <NavLink
            exact
            className={style.link}
            activeClassName={style.active}
            to={ROUTES.home}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            className={style.link}
            activeClassName={style.active}
            to={ROUTES.feed}
          >
            Projecten
          </NavLink>
        </li>

        <li>
          <NavLink
            exact
            className={style.link}
            activeClassName={style.active}
            to={ROUTES.overons}
          >
            Over ons
          </NavLink>
        </li>
        {uiStore.currentUser ? (
          uiStore.currentUser.interestedTags.length === 0 ? (
            <li>
              <NavLink
                exact
                className={style.link}
                activeClassName={style.active}
                to={ROUTES.quiz}
              >
                Personaliseer
              </NavLink>
            </li>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <li>
          <NavLink
            exact
            className={`${style.link} ${style.nav__button}`}
            activeClassName={style.active}
            to={ROUTES.startproject}
          >
            Start een project
          </NavLink>
        </li>
        <li>
          {uiStore.currentUser.picture ? (
            <NavLink
              exact
              className={style.linkImage}
              activeClassName={style.activeImage}
              to={`${ROUTES.profiel.to}${uiStore.currentUser.id}`}
            >
              <img
                className={style.nav__profilePicture}
                src={uiStore.currentUser.picture}
                alt="profiel"
              />
            </NavLink>
          ) : (
            <NavLink
              exact
              className={style.link}
              activeClassName={style.active}
              to={ROUTES.login}
            >
              Aanmelden
            </NavLink>
          )}
        </li>
        {uiStore.currentUser ? (
          uiStore.currentUser.role === 1 ? (
            <li>
              {" "}
              <NavLink
                exact
                className={`${style.link} ${style.nav__button}`}
                activeClassName={style.active}
                to={ROUTES.adminpanel}
              >
                Admin
              </NavLink>{" "}
            </li>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {uiStore.currentUser.id ? (
          <p onClick={uiStore.logOut} className={style.link}>
            Afmelden
          </p>
        ) : (
          ""
        )}
      </ul>
    </nav>
  ));
};

export default Nav;
