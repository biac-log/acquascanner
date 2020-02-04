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
  setSuccessMessage(state, message: string) {
    state.displaySuccessMessage = message !== '';
    state.successMessage = message;
  },
  setLoadingSendArticleScan(state, isLoading: boolean) {
    state.loadingSendArticleScan = isLoading;
  },
  refreshArticles(state, articles: Article[]) {
    state.articles = articles;
    var strings: string = '';
    articles.forEach(function (article) {
      strings += article.Code + '#' + article.CodeEAN + '#' + article.Libelle + '#' + article.ReferenceFournisseur + '§';
    });

    localStorage.setItem("AllArticles", strings);
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
  clearAll(state) {
    state.articles = [];
    state.articlesScan = [];
    state.errorMessage = '';
    state.loading = false;
    localStorage.removeItem("articles");
    localStorage.removeItem("AllArticles");
  },
  resetArticlesScan(state) {
    state.articlesScan = [];
    localStorage.removeItem("articles");
  },
  initAllArticlesFromLocalStorage(state) {
    const allArticlesFromLocal = localStorage.getItem("AllArticles");
    let articles: Article[] = [];
    if (allArticlesFromLocal) {
      const rows = allArticlesFromLocal.split('§');
      rows.forEach(function (row) {
        const element = row.split('#');
        const art: Article = new Article();
        art.Code = element[0];
        art.CodeEAN = element[1];
        art.Libelle = element[2];
        art.ReferenceFournisseur = element[3];
        articles.push(art);
      });
    }
    state.articles = articles;
  },
  displaySuccessMessage(state, value: boolean) {
    state.displaySuccessMessage = value;
  }
};
