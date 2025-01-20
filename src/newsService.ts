import { apiClient } from "./axios";
import { New, Ticker } from "./interfaces";

interface NewDTO {
  id: string;
  publisher?: {
    name?: string;
    homepage_url?: string;
    logo_url?: string;
    favicon_url?: string;
  };
  title?: string;
  author?: string;
  published_utc?: string;
  article_url?: string;
  tickers?: string[];
  image_url?: string;
  description?: string;
  keywords?: string[];
  insights?: {
    ticker?: string;
    sentiment?: New["sentiment"];
    sentiment_reasoning?: string;
  }[];
}

interface NewsResponse {
  count: number;
  next_url?: string;
  prev_url?: string;
  results: NewDTO[];
}

const getNews = async (filters: {
  ticker?: string;
}): Promise<{
  pagination: { nextPage?: string; prevPage?: string; count: number };
  results: New[];
}> => {
  const {
    data: { results, next_url, prev_url, count },
  } = await apiClient.get<NewsResponse>("v2/reference/news", {
    params: { ticker: filters.ticker || "", limit: 100 },
  });

  return {
    pagination: {
      prevPage: prev_url,
      nextPage: next_url,
      count,
    },
    results: results.map(
      ({
        id,
        publisher,
        title,
        description,
        published_utc,
        insights,
        article_url,
      }) => ({
        id,
        date: published_utc || "",
        title: title || "",
        description: description || "",
        publisher: publisher?.name || "",
        link: article_url || "",
        sentiment: filters.ticker
          ? insights?.filter(({ ticker }) => ticker === filters.ticker)[0]
              .sentiment
          : "neutral",
        relatedSymbols:
          insights?.map(
            ({ ticker }): Ticker => ({
              symbol: ticker || "",
              name: ticker || "",
              id: ticker || "",
            })
          ) || [],
      })
    ),
  };
};

export { getNews };
