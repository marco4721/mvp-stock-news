import { apiClient } from "./axios";
import { Ticker } from "./interfaces";

interface TickerDto {
  active?: boolean;
  cik?: string;
  composite_figi?: string;
  currency_name?: string;
  last_updated_utc?: string;
  locale?: string;
  market?: string;
  name?: string;
  primary_exchange?: string;
  share_class_figi?: string;
  ticker?: string;
  type?: string;
}

interface TickersResponse {
  count: number;
  next_url: string;
  results: TickerDto[];
}

const getTickers = async (filters: { ticker?: string }): Promise<Ticker[]> => {
  const { ticker } = filters || {};
  const {
    data: { results },
  } = await apiClient.get<TickersResponse>("/v3/reference/tickers", {
    params: { search: ticker || "" },
  });

  return results.map(({ name, ticker }) => ({
    id: ticker || "",
    name: name || "",
    symbol: ticker || "",
  }));
};

export { getTickers };
