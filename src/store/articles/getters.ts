import { GetterTree } from 'vuex';
import { ArticlesState } from './types';
import { RootState } from '../types';
import { Article } from '../../data/Article';

export const getters: GetterTree<ArticlesState, RootState> = {
    articles(state): Article[] {
        return state.articles;
    },
    articlesScan(state): Article[] {
        return state.articlesScan;
    },
    loading(state): boolean {
        return state.loading;
    },
    loadingSendArticleScan(state): boolean {
        return state.loadingSendArticleScan;
    },
    errorMessage(state): string {
        return state.errorMessage;
    },
    successMessage(state): string {
        return state.successMessage;
    },
    getArticleByCodeEAN: (state) => (codeEAN: string): Article | undefined => {
        let articleFind = state.articlesScan.find((a) => a.CodeEAN === codeEAN);
        if (!articleFind) { articleFind = state.articles.find((a) => a.CodeEAN === codeEAN); }
        if (!articleFind) {
            if (codeEAN === "3564707104302") {
                articleFind = new Article();
                articleFind.Code = "1";
                articleFind.CodeEAN = "3564707104302";
                articleFind.Libelle = "BIO VILLAGE - Chocolat";
            }
            if (codeEAN === "5410471127000") {
                articleFind = new Article();
                articleFind.Code = "2";
                articleFind.CodeEAN = "5410471127000";
                articleFind.Libelle = "JULES DESTROOPER - Croquants aux amandes";
            }
        }
        return articleFind;
    },
    getArticleScanByCode: (state) => (codeEAN: string): Article | undefined => {
        return state.articlesScan.find((a) => a.CodeEAN === codeEAN);
    },
    countArticles: (state): number | undefined => {
        if (state.articles) {
            return state.articles.length;
        } else { return 0; }
    },
    displayArticles(state): Article[] {
        return state.displayArticles;
    }
};
