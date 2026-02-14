import Vue from 'vue';
import Router from 'vue-router';

import LoginView from '../views/LoginView.vue';
// import PostsList from '../components/PostsList.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: LoginView
    },
    // {
    //   path: '/',
    //   component: PostsList
    // }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path !== "/login" && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
