import { Request, Response } from "express";
import httpStatus from "http-status";
import CryptoService from "../services/crypto.service";
import { ICurrencyDTO } from "../dto/crypto.dto";
import config from "../config/env";
import { tryCatch } from "../lib/handleError";

const { cryptoApiKey } = config;

export const getTopCurrencysInUSD = tryCatch(
  async (_req: Request, res: Response) => {
    const cryptoService = new CryptoService(cryptoApiKey);

    const currencys: ICurrencyDTO[] =
      await cryptoService.getTopCryptoCurrencysInUSD();

    res.status(httpStatus.OK).json(currencys);
  }
);

export const getTopCurrencysInARS = tryCatch(
  async (_req: Request, res: Response) => {
    const cryptoService = new CryptoService(cryptoApiKey);

    const currencys: ICurrencyDTO[] =
      await cryptoService.getTopCryptoCurrencysInARS();

    res.status(httpStatus.OK).json(currencys);
  }
);

export const getCryptoById = tryCatch(
  async (req: Request<{ name: string }>, res: Response) => {
    const { name } = req.params;

    const cryptoService = new CryptoService(cryptoApiKey);

    const data = await cryptoService.getCryptoByName(name || "btc");

    res.status(httpStatus.OK).json(data);
  }
);
