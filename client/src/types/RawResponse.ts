import Article from "./Article";
import News from "./News";

/**
 * Raw Api response from backend
 */
type RawResponse = {
  // Status of ok or not
  status: string;
  result?: {
    // Query string
    query: string;
    // Extracted keywords with scores
    keywords: Array<[string, number]>;
    // Trend percentiles and array of ranges
    trend: {
      percentiles: Array<[string, number]>;
      range: {
        x: Array<string>;
        y: Array<number>;
      };
    };
    // Array of articles
    articles: Array<Article>;
    // Array of news
    news: Array<News>;
  };
};

export default RawResponse;
