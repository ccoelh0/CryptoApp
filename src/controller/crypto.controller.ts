import { Request, Response } from "express";
import httpStatus from "http-status";
import CryptoService from "../services/crypto.service";
import { ICurrencyDTO } from "../dto/crypto.dto";
import config from "../config/env";
import { tryCatch } from "../lib/handleError";
import logger from "../lib/logger";

const { cryptoApiKey } = config;

export const getTopCurrencysInUSD = tryCatch(
  async (_req: Request, res: Response) => {
    logger.info("=== Getting top currencys in usd ===");
    const cryptoService = new CryptoService(cryptoApiKey);

    const currencys: ICurrencyDTO[] =
      await cryptoService.getTopCryptoCurrencysInUSD();

    logger.info("=== Success response ===");
    res.status(httpStatus.OK).json(currencys);
  }
);

export const getTopCurrencysInARS = tryCatch(
  async (_req: Request, res: Response) => {
    logger.info("=== Getting top currencys in ars ===");

    const cryptoService = new CryptoService(cryptoApiKey);

    const currencys: ICurrencyDTO[] =
      await cryptoService.getTopCryptoCurrencysInARS();

    logger.info("=== Success response ===");
    res.status(httpStatus.OK).json(currencys);
  }
);

export const getCryptoByName = tryCatch(
  async (req: Request<{}, {}, {}, { name: string }>, res: Response) => {
    logger.info("=== Getting crypto by name ===");

    const { name } = req.query;

    const cryptoService = new CryptoService(cryptoApiKey);

    const data = await cryptoService.getCryptoByName(name || "btc");

    logger.info("=== Success response ===");
    res.status(httpStatus.OK).json(data);
  }
);
