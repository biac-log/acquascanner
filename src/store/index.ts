import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { articles } from './articles/index';
import { authentificationModule } from './authentification/index';
import { modeModule } from './modes/index';
<<<<<<< HEAD
import {fournisseursModule} from './fournisseurs/index'

=======
import { UserModule } from './user/index';
>>>>>>> 50ce210d90cd99605d7f5e19891c6e1dc6775e14

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
<<<<<<< HEAD
    fournisseursModule,
=======
    UserModule,
>>>>>>> 50ce210d90cd99605d7f5e19891c6e1dc6775e14
  },
};

export default new Vuex.Store<RootState>(store);
