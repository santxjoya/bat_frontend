import Vue from 'vue';
import Router from 'vue-router';

import LoginView from '../views/LoginView.vue';
import RegisterView from "../views/RegisterView.vue";
import PostsList from "../views/PostsList.vue";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: LoginView
    },
    {
      path: "/register",
      component: RegisterView
    },
    {
      path: '/',
      component: PostsList
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && to.path !== "/login" && to.path !== "/register"){
    next("/login");
  } else {
    next();
  }
});

export default router;
