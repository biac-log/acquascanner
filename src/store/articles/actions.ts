import { ActionTree } from 'vuex';
import axios from 'axios';
import { ArticlesState } from './types';
import { RootState } from '../types';
import { Article } from '../../data/Article';
import { JsonConvert, ValueCheckingMode } from "json2typescript";

export const actions: ActionTree<ArticlesState, RootState> = {
  refreshArticles({ commit }) {
    commit('setLoading', true);
    let articles: Article[] | null = null;
    axios.get<Article[]>(process.env.VUE_APP_ApiAcQuaUrl + "/Article/GetAllArticle?typeAcces=" + process.env.VUE_APP_ApiAcQuaTypeAccess)
      .then(response => {
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        articles = jsonConvert.deserializeArray(response.data, Article);
        commit('setErrorMessage', '');
      })
      .catch(e => {
        commit('setErrorMessage', e.message + " " + process.env.VUE_APP_ApiAcQuaUrl);
      }).finally(() => {
        if (articles) {
          commit('refreshArticles', articles);
        }
        commit('setLoading', false);
      });;
  },
  initialiseArticleScan(context) {
    context.commit('initialiseArticleScan');
  },
  addArticleScan(context, article: Article) {
    context.commit('addArticleScan', article);
    context.commit('saveArticleScan');
  },
  removeArticleScan(context, article: Article) {
    context.commit('removeArticleScan', article);
    context.commit('saveArticleScan');
  },
  sendArticlesScan(context): any {
    context.commit('setLoadingSendArticleScan', true);
    axios.post(process.env.VUE_APP_ApiAcQuaUrl + "/Inventaire/ExportToCSV", context.state.articlesScan)
      .then((r) => {
        context.commit('resetArticlesScan');
        context.commit('setErrorMessage', '');
        context.commit('setSuccessMessage', "L'envoi des articles scannés s'est effectué avec succès.");
      })
      .catch((e) => {
        context.commit('setErrorMessage', "Erreur lors de la communication avec le serveur. Êtes-vous bien connecté au réseau ? " + e.message);
      }).finally(() => {
        context.commit('setLoadingSendArticleScan', false);
      });
  },
  clearAll({ commit }): any {
    commit('clearAll');
  },
  initAllArticlesFromLocalStorage({ commit }): any {
    commit('initAllArticlesFromLocalStorage');
  },
  displaySuccessMessage({ commit }, value: boolean) {
    commit('displaySuccessMessage', value);
  }
};
