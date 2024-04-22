import ApiData from "../types/ApiData";
import RawResponse from "../types/RawResponse";
import Utils from "../common/Utils";
import { BaseException } from "./BaseException";

/**
 * Api wrapper
 */
namespace Api {
  /**
   * Api endpoint
   */
  export const endPoint =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api"
      : `${process.env.PUBLIC_URL}/api`;

  /**
   * Parse raw query response into wrapped api data object
   * @param json Raw response
   * @return Data, when error return undefined
   */
  const parseData = (json: RawResponse): ApiData | undefined => {
    let data: ApiData | undefined = undefined;
    switch (json.status) {
      case "ok":
        if (json.result) {
          // Normalize scores for better word cloud size
          const normalizedKeywordScores = Utils.normalize(
            json.result.keywords.map((x) => x[1]),
            5,
            25,
          );
          data = {
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
        }
        break;
      case "error":
      case "empty":
      default:
        break;
    }
    return data;
  };

  /**
   * Fetch query results
   * @param keyword
   */
  export const fetchData = async (keyword?: string) => {
    if (keyword) {
      const params = { keywords: keyword };
      const query = new URLSearchParams(params);
      try {
        const response = await fetch(`${endPoint}/query?${query}`);
        if (response.status !== 200) {
          throw new NetworkStatusNotOkException(response.status);
        } else {
          const json = (await response.json()) as RawResponse;
          return parseData(json);
        }
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  /**
   * Fetch auto completion
   * @param keyword
   */
  export const fetchComplete = async (
    keyword?: string,
  ): Promise<Array<string> | undefined> => {
    if (keyword) {
      const params = { keywords: keyword };
      const query = new URLSearchParams(params);
      try {
        const response = await fetch(`${endPoint}/complete?${query}`);
        if (response.status !== 200) {
          throw new NetworkStatusNotOkException(response.status);
        } else {
          return response.json();
        }
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  /**
   * Exception when network response status is not 200
   */
  export class NetworkStatusNotOkException extends BaseException {
    constructor(statusCode: number) {
      super(`Fetch data failed with status code ${statusCode}`);
    }
  }
}

export default Api;
