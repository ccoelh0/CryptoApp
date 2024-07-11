import { ICrypto } from "../interfaces";
import HttpService from "../config/http";
import { ITopCurrencyDTO, TopCryptoCurrencyDTO } from "../dto/crypto.dto";

const CRYPTO_URL = "https://pro-api.coinmarketcap.com";

export default class CryptoService {
  private apiKey: string;

  private httpService: HttpService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.httpService = new HttpService(CRYPTO_URL);
  }

  async getTopCryptoCurrencys(): Promise<ITopCurrencyDTO[]> {
    const path = "/v1/cryptocurrency/listings/latest";
    const params = {
      start: 1,
      limit: 5,
      convert: "USD",
    } as const;
    const headers = {
      "X-CMC_PRO_API_KEY": this.apiKey,
    };
    const response = await this.httpService.get<ICrypto.IGetTopCurrencys>(
      path,
      {
        headers,
        params,
      }
    );

    const { data: cryptos } = response.data;

    return cryptos.map(({ name, quote }) => {
      const { price, percent_change_24h: variation24hs } = quote.USD;

      return new TopCryptoCurrencyDTO({
        name,
        price,
        priceIn: "USD",
        variation24hs,
      });
    });
  }
}
