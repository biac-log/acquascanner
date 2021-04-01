import { MutationTree } from 'vuex';
import { PrintersState } from './types';
import { Printer } from '../../data/Printer';
import router from '@/router';
export const mutations: MutationTree<PrintersState> = {
  refreshPrinters(state, printers: Printer[]){
      state.printers = printers;
  }
};
