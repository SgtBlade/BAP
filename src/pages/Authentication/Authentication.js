import React from "react";
import { useObserver } from "mobx-react-lite";
import { Switch, Route /*Redirect, */ } from "react-router-dom";
import { ROUTES } from "../../consts/index.js";
//import style from "./Authentication.module.css";
import PasswordResetForm from "../F_PasswordResetForm/passwordResetForm";
import Person from "../Profile/profile.js";
import LoginForm from "../F_LoginForm/loginForm.js";
import RegisterForm from "../F_RegisterForm/registerForm.js";
import ProjectDetail from "../Projectdetail/projectdetail.js";
import PersonalFeed from "../PersonalFeed/personalFeed.js";
import Nav from "../../components/Nav/nav";
import Footer from "../../components/Footer/footer.js";
import Home from "../Home/home.js";
import CreateProjectForm from "../F_CreateProjectForm/createProjectForm";
import Discovery from "../Discovery/Discovery.js";
import Quiz from "../Quiz/quiz.js";


const Authentication = () => {
  return useObserver(() => (
    <>
      <Nav />
      <div>
        <Switch>
          <Route exact path={ROUTES.projecten}></Route>
          <Route exact path={ROUTES.overons}>
            <ProjectDetail />
          </Route>

          <Route exact path={ROUTES.projectDetail.path}>
              <ProjectDetail />
          </Route>

          <Route exact path={ROUTES.startproject}>
            <CreateProjectForm />
          </Route>

          <Route exact path={ROUTES.profiel}>
            <Person />
          </Route>

          <Route exact path={ROUTES.registreer}>
            <RegisterForm />
          </Route>

          <Route exact path={ROUTES.login}>
            <LoginForm />
          </Route>

          <Route exact path={ROUTES.reset}>
            <PasswordResetForm />
          </Route>

          <Route exact path={ROUTES.feed}>
            <PersonalFeed />
          </Route>

          <Route exact path={ROUTES.discovery}>
            <Discovery />
          </Route>

          <Route exact path={ROUTES.home}>
            {/* <Testenv/> */}
            <Home />
          </Route>

          <Route exact path={ROUTES.quiz}>
            <Quiz />
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
        <Footer />
      </div>
    </>
  ));
};

export default Authentication;
