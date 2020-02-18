import Vue from 'vue';
import Router, { NavigationGuard } from 'vue-router';
import SearchFournisseur from './components/SearchFournisseur.vue';
import ScanArticles from './components/ScanArticles.vue';
import ScanModes from './components/ScanModes.vue';
import Options from './views/Options.vue';
import Login from './components/Login.vue';
import store from './store'; // your vuex store
import { modes } from './store/modes/const'

Vue.use(Router);

const ifNotAuthenticated: NavigationGuard = (to, from, next) => {
  if (!store.getters["authentificationModule/isAuthenticated"]()) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated: NavigationGuard = (to, from, next) => {
  if (store.getters["authentificationModule/isAuthenticated"]()) {
    if (to.name == "ChoixFournisseur" && store.getters["fournisseursModule/getFournisseurName"] != "")
      next('/Commande');
    next();
    return;
  }
  next('/login');
};

const haveAuthorization: NavigationGuard = (to, from, next) => {
  if (!store.getters["authentificationModule/isAuthenticated"]()) {
    next('/login');
    return;
  }
  var modeDest = modes.find(m => m.destination === to.name);
  var droits = store.getters["UserModule/getDroits"];
  if (modeDest && droits && droits.includes(modeDest.permissionId)) {
    next();
    return;
  }
  next('/');
}

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
      beforeEnter: haveAuthorization,
    },
    {
      path: '/Entree',
      name: 'Entree',
      component: ScanArticles,
      beforeEnter: haveAuthorization,
    },
    {
      path: '/RectPlus',
      name: 'RectPlus',
      component: ScanArticles,
      beforeEnter: haveAuthorization,
    },
    {
      path: '/RectMinus',
      name: 'RectMinus',
      component: ScanArticles,
      beforeEnter: haveAuthorization,
    },
    {
      path: '/Vente',
      name: 'Vente',
      component: ScanArticles,
      beforeEnter: haveAuthorization,
    },
    {
      path: '/Livraison',
      name: 'Livraison',
      component: ScanArticles,
      beforeEnter: haveAuthorization,
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
      path: '/ChoixFournisseur',
      name: 'ChoixFournisseur',
      component: SearchFournisseur,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

