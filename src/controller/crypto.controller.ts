import { RequestHandler } from "express";
import CryptoService from "../services/crypto.service";
import httpStatus from "http-status";
import { ITopCurrencyDTO } from "@/dto/crypto.dto";

const API_KEY = "c5606cbf-747a-4732-8128-b83fce141225";

export const getTopCurrencys: RequestHandler = async (_req, res) => {
  const cryptoService = new CryptoService(API_KEY);

  const currencys: ITopCurrencyDTO[] =
    await cryptoService.getTopCryptoCurrencys();

  res.status(httpStatus.OK).json(currencys);
};
