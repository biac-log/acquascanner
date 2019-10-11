import { MutationTree } from 'vuex';
import { ArticlesState } from './types';
import { Article } from '../../data/Article';

export const mutations: MutationTree<ArticlesState> = {
  setLoading(state, isLoading: boolean) {
    state.loading = isLoading;
  },
  setErrorMessage(state, errorMessage: string) {
    state.errorMessage = errorMessage;
  },
  refreshArticles(state, articles: Article[]) {
    state.articles = articles;
  },
  resetArticles(state) {
    state.articles = [];
  },
  resetArticlesScan(state) {
    state.articlesScan = [];
  },
  initialiseArticleScan(state) {
    if (localStorage.getItem("articles")) {
      try {
        const valuesInLocal = localStorage.getItem("articles");
        if (valuesInLocal) { state.articlesScan = JSON.parse(valuesInLocal); }
      } catch (e) {
        localStorage.removeItem("articles");
      }
    }
  },
  addArticleScan(state, article: Article) {
    if (article) {
      const articleFind = state.articlesScan.find((a) => a.Code === article.Code);
      if (articleFind) {
        articleFind.Quantite = article.Quantite;
      } else {
        state.articlesScan.unshift(article);
      }
    }
  },
  removeArticleScan(state, codeArticle: string) {
    const articleFind = state.articlesScan.find((article) => article.Code === codeArticle);
    if (articleFind) {
      state.articlesScan.splice(state.articlesScan.indexOf(articleFind), 1);
    }
  },
  saveArticleScan(state) {
    localStorage.setItem("articles", JSON.stringify(state.articlesScan));
  },
  sendArticlesScan(state) {
    state.articlesScan = [];
    localStorage.removeItem("articles");
  },
  clearAll(state) {
    state.articlesScan = [];
    state.errorMessage = '';
    state.loading = false;
    localStorage.removeItem("articles");
  }
};
