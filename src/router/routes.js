const routes = [
  {
    path: "/",
    name: "splash",
    exact: true,
    component: () => import("layouts/Splash.vue")
  },
  {
    path: "/login",
    name: "login",
    exact: true,
    component: () => import("layouts/LoginLayout.vue")
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    exact: true,
    children: [
      {
        path: "",
        name: "main",
        exact: true,
        component: () => import("pages/Index.vue")
      },
      {
        path: "/department",
        name: "department",
        exact: true,
        component: () => import("pages/Department.vue")
      },
      {
        path: "/position",
        name: "position",
        exact: true,
        component: () => import("pages/Position.vue")
      },
      {
        path: "/permission",
        name: "permission",
        exact: true,
        component: () => import("pages/Permission.vue")
      },
      {
        path: "/rigs",
        name: "rigs",
        exact: true,
        component: () => import("pages/Rigs.vue")
      },
      {
        path: "/users",
        name: "users",
        exact: true,
        component: () => import("pages/Users.vue")
      },
      {
        path: "/smarter-sheet",
        name: "smarter-sheet",
        exact: true,
        component: () => import("pages/SmarterSheet.vue")
      },
      {
        path: "/smarter-dashboard",
        name: "smarter-dashboard",
        exact: true,
        component: () => import("pages/Department.vue")
      },
      {
        path: "/smarter-categories",
        name: "smarter-categories",
        exact: true,
        component: () => import("pages/SmarterCategories.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
