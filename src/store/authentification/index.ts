import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AuthentificationState } from './types';
import { RootState } from '../types';

export const state: AuthentificationState = {
    token : localStorage.getItem("user-token") || "",
    status : '',
    hasLoadedOnce : false 
};

const namespaced: boolean = true;

export const authentificationModule: Module<AuthentificationState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
