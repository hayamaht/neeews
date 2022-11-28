import { Article } from "~app/models/article";

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
