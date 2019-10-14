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
    errorMessage(state): string {
        return state.errorMessage;
    },
    getArticleByCodeEAN: (state) => (codeEAN: string): Article | undefined => {
        const articleFind = state.articlesScan.find((a) => a.CodeEAN === codeEAN);
        if (!articleFind) state.articles.find((a) => a.CodeEAN === codeEAN);
        return articleFind;
    },
    getArticleScanByCode: (state) => (code: string): Article | undefined => {
        return state.articlesScan.find((a) => a.Code === code);
    },
    countArticles: (state): number | undefined => {
        if (state.articles)
            return state.articles.length;
        else return 0;
    },
};
