import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";
import styles from "./nav.module.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to={ROUTES.home}>Home</NavLink>
        </li>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to={ROUTES.projecten}>Search</NavLink>
        </li>
        
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to={ROUTES.overons}>Over ons</NavLink>
        </li>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to={ROUTES.startproject}>Start een project</NavLink>
        </li>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to={ROUTES.profiel}>Profiel</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
