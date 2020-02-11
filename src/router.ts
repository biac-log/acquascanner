import Vue from 'vue';
import Router, { NavigationGuard } from 'vue-router';
import ScanArticles from './components/ScanArticles.vue';
import ScanModes from './components/ScanModes.vue';
import Options from './views/Options.vue';
import Login from './components/Login.vue';
import store from './store'; // your vuex store
import PrintArticle from './components/PrintArticle.vue'

Vue.use(Router);

const ifNotAuthenticated: NavigationGuard = (to, from, next) => {
  if (!store.getters["authentificationModule/isAuthenticated"]) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated: NavigationGuard = (to, from, next) => {
  if (store.getters["authentificationModule/isAuthenticated"]) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: ScanModes,
      beforeEnter: ifAuthenticated,

    },
    {
      path: '/Inventaire',
      name: 'Inventaire',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/Entree',
      name: 'Entree',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/RectPlus',
      name: 'RectPlus',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/RectMinus',
      name: 'RectMinus',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/Vente',
      name: 'Vente',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/Livraison',
      name: 'Livraison',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/commande',
      name: 'Commande',
      component: ScanArticles,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/Etiquettes',
      name: 'Etiquettes',
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
      redirect: '/',
    },
  ],
});
