import { Article } from '../../data/Article';

export interface ArticlesState {
  articles: Article[];
  articlesScan: Article[];
  loading: boolean;
  errorMessage: string;
  displaySuccessMessage: boolean;
  successMessage: string;
  loadingSendArticleScan: boolean;
  displayArticles: Article[];
}
