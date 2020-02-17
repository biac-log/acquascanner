import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { articles } from './articles/index';
import { authentificationModule } from './authentification/index';
import { modeModule } from './modes/index';
import { UserModule } from './user/index';

Vue.use(Vuex);

// Vuex structure based on https://codeburst.io/vuex-and-typescript-3427ba78cfa8

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0', // a simple property
  },
  modules: {
    articles,
    authentificationModule,
    modeModule,
    UserModule,
  },
};

export default new Vuex.Store<RootState>(store);
