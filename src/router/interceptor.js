// import router from "@/router/index";
// import store from "@/store";

// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = store.getters["auth/isAuthenticated"];
//   const user = store.getters["auth/user"];


//   if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
//     if (to.path !== "/login") {
//       next("/login");
//     } else {
//       next();
//     }
//   } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
//     if (isAuthenticated && user.role === "1") {
//       next();
//     } else {
//       if (to.path !== "/login") {
//         next("/login");
//       } else {
//         next();
//       }
//     }
//   } else if (isAuthenticated) {
//     if (user.role === "1" && to.path.startsWith("/admin")) {
//       next();
//     } else if (user.role === "0" && !to.path.startsWith("/admin")) {
//       next();
//     } else {
//       if (to.path !== "/login") {
//         next("/login");
//       } else {
//         next();
//       }
//     }
//   } else {
//     next();
//   }
// });
import router from "@/router/index";
import store from "@/store";

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const user = store.getters["auth/user"];

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next("/login");
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (isAuthenticated && user.role === "1") {
      next();
    } else {
      next("/login");
    }
  } else if (isAuthenticated) {
    if (user.role === "1" && to.path.startsWith("/admin")) {
      next();
    } else if (user.role === "0" && !to.path.startsWith("/admin")) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});