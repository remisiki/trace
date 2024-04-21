import Article from "./Article";
import News from "./News";

type Counter = {
  // Date range in a human-readable string
  period: string;
  // Count of papers during the period
  count: number;
};

type Keyword = {
  // Keyword text
  text: string;
  // Score, or weight of keyword among all
  value: number;
};

/**
 * Data wrapper that is fetched from Api
 */
type ApiData = {
  // Query string
  query: string;
  // Array of extracted keywords
  keywords: Array<Keyword>;
  // Array of date range and paper count percentiles
  percentiles: Array<Counter>;
  // Array of dates
  rangeX: Array<string>;
  // Array of paper count for each date
  rangeY: Array<number>;
  // Array of related articles
  articles: Array<Article>;
  // Array of related news
  news: Array<News>;
};

export default ApiData;
