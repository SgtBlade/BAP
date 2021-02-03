import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./nav.module.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to="/projecten">Search</NavLink>
        </li>
        
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to="/overons">Over ons</NavLink>
        </li>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to="/startproject">Start een project</NavLink>
        </li>
        <li>
          <NavLink exact className={styles.link} activeClassName={styles.active} to="/profiel">Profiel</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
