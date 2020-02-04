import Vue from 'vue';
import Router, { NavigationGuard } from 'vue-router';
import ScanArticles from './components/ScanArticles.vue';
import Options from './views/Options.vue';
import Login from './components/Login.vue';
import store from './store' // your vuex store 

Vue.use(Router);

const ifNotAuthenticated: NavigationGuard = (to, from, next) => {
  if (!store.getters["authentificationModule/isAuthenticated"]) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated: NavigationGuard = (to, from, next) => {
  if (store.getters["authentificationModule/isAuthenticated"]) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ScanArticles',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/options',
      name: 'Options',
      component: Options,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});
