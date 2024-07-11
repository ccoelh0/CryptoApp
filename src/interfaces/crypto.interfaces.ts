export interface IGetTopCurrencys {
  data: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    num_market_pairs: number;
    date_added: string;
    tags: string[];
    max_supply: number;
    circulating_supply: number;
    total_supply: number;
    infinite_supply: boolean;
    platform: any;
    cmc_rank: number;
    self_reported_circulating_supply: any;
    self_reported_market_cap: any;
    tvl_ratio: any;
    last_updated: string;
    quote: {
      USD: {
        price: number;
        percent_change_1h: number;
        percent_change_24h: number;
      };
    };
  }[];
}
