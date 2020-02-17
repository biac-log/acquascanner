import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { FournisseurState } from './types';
import { RootState } from '../types';


export const state: FournisseurState = {
    fournisseurs : [],
    loading: false,
    fournisseurName1: "",
    fournisseurName2: "",
    fournisseurName3: "",
};

const namespaced: boolean = true;

export const fournisseursModule: Module<FournisseurState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
