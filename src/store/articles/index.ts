import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ArticlesState } from './types';
import { RootState } from '../types';

export const state: ArticlesState = {
  articles: [],
  articlesScan: [],
  loading: false,
  errorMessage: '',
  successMessage: '',
  displaySuccessMessage: false,
  loadingSendArticleScan: false,
  displayArticles: []
};

const namespaced: boolean = true;

export const articles: Module<ArticlesState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
