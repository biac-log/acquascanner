import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { PrintersState } from './types';
import { RootState } from '../types';

export const state: PrintersState = {
  printers: []
};

const namespaced: boolean = true;

export const printers: Module<PrintersState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
