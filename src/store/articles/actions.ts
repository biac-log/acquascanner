import { ActionTree } from 'vuex';
import axios from 'axios';
import { ArticlesState } from './types';
import { RootState } from '../types';
import { Article } from '../../data/Article';
import { JsonConvert, ValueCheckingMode } from "json2typescript";

export const actions: ActionTree<ArticlesState, RootState> = {
  async refreshArticles({ commit }): Promise<any> {
    commit('setLoading', true);
    let articles: Article[] | null = null;
    await axios.get<Article[]>(process.env.VUE_APP_ApiAcQuaUrl + "/Article/GetAllArticle?typeAcces=" + process.env.VUE_APP_ApiAcQuaTypeAccess)
      .then(response => {
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        articles = jsonConvert.deserializeArray(response.data, Article);
        commit('setErrorMessage', '');
      })
      .catch(e => {
        commit('setErrorMessage', e.message + " " + process.env.VUE_APP_ApiAcQuaUrl);
      });
    if (articles)
      commit('refreshArticles', articles);
    commit('setLoading', false);
  },
  resetArticles({ commit }): any {
    commit('resetArticles');
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
  resetArticlesScan({ commit }): any {
    commit('resetArticlesScan');
    commit('saveArticleScan');
  },
  sendArticlesScan({ commit }): any {
    commit('sendArticlesScan');
  },
  clearAll({ commit }): any {
    commit('clearAll');
  }
};
