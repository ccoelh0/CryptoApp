import { ICrypto } from "../interfaces";
import http, { HttpServiceType, isHttpError } from "../config/http";
import { ICurrencyDTO, CryptoCurrencyDTO } from "../dto/crypto.dto";
import { handleError, HandleError } from "../lib/handleError";
import ApiError from "../lib/apiError";
import httpStatus from "http-status";
import { ICryptoError } from "@/interfaces/crypto.interfaces";

const CRYPTO_URL = "https://pro-api.coinmarketcap.com";
const QUOTE_URL = "https://criptoya.com";

export default class CryptoService {
  private apiKey: string;

  private HttpService: HttpServiceType;

  private handleError: HandleError;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.HttpService = http;
    this.handleError = handleError;
  }

  private setHeadersCryptoAPI() {
    const authHeader = "X-CMC_PRO_API_KEY";

    return {
      [authHeader]: this.apiKey,
    };
  }

  async getTopCryptoCurrencysInUSD(): Promise<ICurrencyDTO[]> {
    const { HttpService } = this;
    const httpService = new HttpService(CRYPTO_URL);

    const path = "/v1/cryptocurrency/listings/latest";

    const params = {
      start: 1,
      limit: 5,
      convert: "USD",
    } as const;

    const headers = this.setHeadersCryptoAPI();

    try {
      const response = await httpService.get<ICrypto.IGetTopCurrencys>(path, {
        headers,
        params,
      });

      const { data: cryptos } = response.data;

      return cryptos.map(({ name, quote }) => {
        const { price, percent_change_24h: percentChange24h } = quote.USD;

        return new CryptoCurrencyDTO({
          name,
          price,
          percentChange24h,
        });
      });
    } catch (error) {
      return this.handleCryptoAPIError(error);
    }
  }

  async getTopCryptoCurrencysInARS(): Promise<ICurrencyDTO[]> {
    const { HttpService } = this;
    const httpService = new HttpService(QUOTE_URL);

    const path = "/api/usdt/ars/1";

    const cryptos = await this.getTopCryptoCurrencysInUSD();

    try {
      const { data } = await httpService.get<ICrypto.IQuote>(path);
      const { totalBid: quoteInArs } = data.tiendacrypto;

      return cryptos.map((crypto) => ({
        ...crypto,
        price: crypto.price * quoteInArs,
        priceIn: "ARS",
      }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCryptoByName(name: string) {
    const { HttpService } = this;
    const httpService = new HttpService(CRYPTO_URL);

    const path = "/v1/cryptocurrency/quotes/latest";
    const params = { slug: name };
    const headers = this.setHeadersCryptoAPI();
    const config = { params, headers };

    try {
      const { data: crypto } = await httpService.get<ICrypto.IGetCryptoByName>(
        path,
        config
      );
      const { data } = crypto;
      const cryptoId = Object.keys(data)[0];
      const cryptoFound = crypto.data[cryptoId || ""];

      if (!cryptoId || !cryptoFound)
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Could not get crypto id"
        );

      const { name, quote } = cryptoFound;
      const { price, percent_change_24h: percentChange24h } = quote.USD;

      return new CryptoCurrencyDTO({
        name,
        price,
        percentChange24h,
      });
    } catch (error: any) {
      if (error instanceof ApiError) throw error;

      this.handleCryptoAPIError(error);
    }
  }

  private handleCryptoAPIError(err: any): never {
    let message: string = "Internal server error";
    let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;

    if (!isHttpError(err))
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message);

    const { code, message: basicMsg, response } = err;
    message = basicMsg;

    if (response) {
      const { status, data } = response;
      statusCode = status;

      if (data) {
        const {
          status: { error_message: errMsg, error_code: errCode },
        } = data as ICryptoError;
        message = errMsg;
        statusCode = errCode;
      }
    }

    throw new ApiError(statusCode, message, code);
  }
}
