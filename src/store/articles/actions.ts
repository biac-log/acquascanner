import { ActionTree } from 'vuex';
import axios from 'axios';
import { ArticlesState } from './types';
import { RootState } from '../types';
import { Article } from '../../data/Article';
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import router from '@/router';


export const actions: ActionTree<ArticlesState, RootState> = {
  refreshArticles({ commit }) {
    commit('setLoading', true);
    let articles: Article[] | null = null;
    axios.get<Article[]>(process.env.VUE_APP_ApiArticle + "/Article/GetAllArticle")
      .then((response) => {
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        articles = jsonConvert.deserializeArray(response.data, Article);
        commit('setErrorMessage', '');
      })
      .catch((e) => {
        commit('setErrorMessage', e.message + ' ' + process.env.VUE_APP_ApiAcQuaUrl);
      }).finally(() => {
        if (articles) {
          commit('refreshArticles', articles);
        }
        commit('setLoading', false);
      });
  },

  getArticleByCodeEAN({ commit, dispatch }, codeEAN: string) {
    return new Promise((resolve, reject) => {
      axios.get<Article>(process.env.VUE_APP_ApiArticle + "/Article/GetArticleByCodeEAN?code=" + codeEAN)
        .then((response) => { resolve(response) })
        .catch((e) => { reject(e) })
    })
  },

  initialiseArticleScan({commit}) {
    commit('initialiseArticleScan');
  },
  addArticleScan(context, article: Article) {
    context.commit('addArticleScan', article);
    context.commit('saveArticleScan');
  },
  removeArticleScan(context, article: Article) {
    context.commit('removeArticleScan', article);
    context.commit('saveArticleScan');
  },
  sendArticlesScan(context, {userSession, routeController}): any {
    context.commit('setLoadingSendArticleScan', true);
    var url: string =  process.env.VUE_APP_ApiStock + '/Stock/' + routeController + '?user=' + userSession;
    axios.post(url, context.state.articlesScan)
      .then((r) => {
        context.commit('resetArticlesScan');
        context.commit('setErrorMessage', '');
        context.commit('setSuccessMessage', "L'envoi des articles scannés s'est effectué avec succès.");
      })
      .catch((e) => {
        context.commit('setErrorMessage', 'Erreur lors de la communication avec le serveur. Êtes-vous bien connecté au réseau ? ' + e.message);
      }).finally(() => {
        context.commit('setLoadingSendArticleScan', false);
      });
  },
  clearAll({ commit }): any {
    commit('clearAll');
    commit('fournisseursModule/clearAll');
  },
  initAllArticlesFromLocalStorage({ commit }): any {
    commit('initAllArticlesFromLocalStorage');
  },
  displaySuccessMessage({ commit }, value: boolean) {
    commit('displaySuccessMessage', value);
  },
  sendArticlesCommande({ commit, getters, rootState, rootGetters }): any {
    commit('setLoadingSendArticleScan', true);
    const numero =`${rootGetters['fournisseursModule/getFournisseurNumero']}`;
    axios.post(`${process.env.VUE_APP_ApiArticle}/Fournisseurs/${numero}/FichierCommande`, getters.articlesScan)
    .then((r) => {
      commit('resetArticlesScan');
      commit('fournisseursModule/clearFournisseur', null, {root : true});
      commit('setErrorMessage', '');
      commit('setSuccessMessage', "L'envoi du bon de commande des articles scannés s'est effectué avec succès.");
      router.push("/")
    })
    .catch((e) => {
      commit('setErrorMessage', 'Erreur lors de la communication avec le serveur. Êtes-vous bien connecté au réseau ? ' + e.message);
    }).finally(() => {
      commit('setLoadingSendArticleScan', false)
    });
  },
    PrintEtiquettes(context): any {
    context.commit('setLoadingSendArticleScan', true);
    axios.post(process.env.VUE_APP_ApiArticle  + '/Etiquettes', context.state.articlesScan)
    .then((r) => {
      context.commit('resetArticlesScan');
      context.commit('setErrorMessage', '');
      context.commit('setSuccessMessage', "La demande d'impression a été effectuée avec succès.");
      router.push("/")
    })
    .catch((e) => {
      context.commit('setErrorMessage', 'Erreur lors de la communication avec le serveur. Êtes-vous bien connecté au réseau ? ' + e.message);
    }).finally(() => {
      context.commit('setLoadingSendArticleScan', false)
    });
  }
};
