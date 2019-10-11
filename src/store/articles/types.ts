import { Article } from '../../data/Article';

export interface ArticlesState {
  articles: Article[];
  articlesScan: Article[];
  loading: boolean;
  errorMessage: string;
}
