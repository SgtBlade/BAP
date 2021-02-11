const ROUTES = {
  home: "/",
  login: "/login",
  registreer: "/registreer",
  reset: "/reset",
  projectBewerken: {path: "/projecten/bewerken/:id", to: "/projecten/bewerken/"},
  projectDetail: { path: "/projecten/:id", to: "/projecten/" },
  profiel: { path: "/profiel/:id", to: "/profiel/" },
  projecten: "/projecten",
  overons: "/overons",
  startproject: "/startproject",
  feed: "/feed",
  projectEdit: "/feed",
  discovery: "/discovery",
  quiz: "/quiz",
};

export { ROUTES };
