import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/index';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: (el) => { Vue.nextTick(() => el.focus()); }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
