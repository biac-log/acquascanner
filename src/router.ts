import Vue from 'vue';
import Router from 'vue-router';
import ScanArticles from './components/ScanArticles.vue';
import Options from './views/Options.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ScanArticles',
      component: ScanArticles,
    },
    {
      path: '/options',
      name: 'Options',
      component: Options,
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});
