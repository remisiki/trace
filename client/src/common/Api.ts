import ApiData from "../types/ApiData";
import RawResponse from "../types/RawResponse";
import Utils from "../common/Utils";

/**
 * Api wrapper
 */
namespace Api {
  /**
   * Api endpoint
   */
  export const endPoint =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : `${process.env.PUBLIC_URL}/api`;

  /**
   * Parse raw query response into wrapped api data object
   * @param json Raw response
   */
  const parseData = (json: RawResponse): ApiData => {
    // Normalize scores for better word cloud size
    const normalizedKeywordScores = Utils.normalize(
      json.result.keywords.map((x) => x[1]),
      5,
      25,
    );
    return {
      query: json.result.query,
      keywords: json.result.keywords.map((x, i) => {
        return {
          text: x[0],
          value: normalizedKeywordScores[i],
        };
      }),
      percentiles: json.result.trend.percentiles.map((x) => {
        return {
          period: x[0],
          count: x[1],
        };
      }),
      rangeX: json.result.trend.range.x,
      rangeY: json.result.trend.range.y,
      articles: json.result.articles,
      news: json.result.news,
    };
  };

  /**
   * Fetch query results
   * FIXME Error handler
   * @param keyword
   */
  export const fetchData = async (keyword?: string) => {
    if (keyword) {
      const params = { keywords: keyword };
      const query = new URLSearchParams(params);
      const response = await fetch(`${endPoint}/query?${query}`);
      const json = (await response.json()) as RawResponse;
      return parseData(json);
    } else {
      return undefined;
    }
  };

  /**
   * Fetch auto completion
   * FIXME Error handler
   * @param keyword
   */
  export const fetchComplete = async (
    keyword?: string,
  ): Promise<Array<string> | undefined> => {
    if (keyword) {
      const params = { keywords: keyword };
      const query = new URLSearchParams(params);
      const response = await fetch(`${endPoint}/complete?${query}`);
      return response.json();
    } else {
      return undefined;
    }
  };
}

export default Api;
