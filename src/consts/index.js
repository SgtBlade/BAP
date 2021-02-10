const ROUTES = {
  home: "/",
  login: "/login",
  registreer: "/registreer",
  reset: "/reset",
  projectBewerken: {path: "/projecten/bewerken/:id", to: "/projecten/bewerken/"},
  projectDetail: { path: "/projecten/:id", to: "/projecten/" },
  projecten: "/projecten",
  overons: "/overons",
  startproject: "/startproject",
  profiel: "/profiel",
  feed: "/feed",
  projectEdit: "/feed",
  discovery: "/discovery",
  quiz: "/quiz",
};

export { ROUTES };
