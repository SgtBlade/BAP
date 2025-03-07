import React from "react";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, /*Redirect, */ 
Redirect} from "react-router-dom";
import { ROUTES } from "../../consts/index.js";
//import style from "./Authentication.module.css";
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
//import ProjectEdit from "../ProjectEdit/projectEdit.js";
import { useStores } from "../../hooks/useStores.js";
import Adminpanel from "../Adminpanel/adminpanel.js";


const Authentication = () => {
  const { uiStore} = useStores();

  return useObserver(() => (
    <>
      <Nav />
      <div>
        <Switch>

          <Route exact path={ROUTES.overons}>
            <ProjectDetail />
          </Route>

        {/*
          <Route exact path={ROUTES.projectBewerken.path}>
            {true ?
            <ProjectEdit />
            :
            <Redirect to={ROUTES.discovery}/>
          }
          </Route>
        */}

          <Route exact path={ROUTES.projectDetail.path}>
              <ProjectDetail />
          </Route>
          

          <Route exact path={ROUTES.startproject}>
            {uiStore.currentUser ? 
            <CreateProjectForm />
            :
            <Redirect to={ROUTES.discovery}/>
            }
          </Route>

          <Route exact path={ROUTES.profiel.path}>
            <Person />
          </Route>

          <Route exact path={ROUTES.registreer}>
            {uiStore.currentUser ?
               uiStore.currentUser.interestedTags.length === 0?
               <Redirect to={ROUTES.quiz}/>
                :
                <Redirect to={ROUTES.discovery}/>
              :
              <RegisterForm />
            }
          </Route>

          <Route exact path={ROUTES.login}>
            {uiStore.currentUser ? 
              <Redirect to={ROUTES.discovery}/>
              :
              <LoginForm />
            }
          </Route>

          <Route exact path={ROUTES.reset}>
            {uiStore.currentUser ? 
              <LoginForm />
              :
              <Redirect to={ROUTES.discovery}/>
            }
          </Route>

          <Route exact path={ROUTES.feed}>
            <PersonalFeed />
          </Route>

          <Route exact path={ROUTES.discovery}>
            <Discovery />
          </Route>

          <Route exact path={ROUTES.home}>
            <Home />
          </Route>

          <Route exact path={ROUTES.quiz}>
            {uiStore.currentUser ?
              <Quiz />
              :
              ''}
          </Route>

          <Route exact path={ROUTES.adminpanel}>
            {uiStore.currentUser ? 
              uiStore.currentUser.role === 1 ?
              <Adminpanel/>
              :
              <Redirect to={ROUTES.home}/>
              :
              <Redirect to={ROUTES.home}/>
            }
          </Route>

          <Redirect to={ROUTES.home}/>

        </Switch>
        <Footer />
      </div>
    </>
  ));
};

export default Authentication;
