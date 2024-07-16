import { Router } from "express";
import * as cryptoController from "../controller/crypto.controller";

const router = Router();

router.get("/top-currencys-in-usd", cryptoController.getTopCurrencysInUSD);
router.get("/top-currencys-in-ars", cryptoController.getTopCurrencysInARS);
router.get("/get-crypto-by-name/:name", cryptoController.getCryptoById);

export default router;
