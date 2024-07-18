import { Router } from "express";
import * as cryptoController from "../controller/crypto.controller";
import validateRequest, {
  getCryptoByNameSchema,
} from "../middlewares/middleware";

const router = Router();

router.get("/top-currencys-in-usd", cryptoController.getTopCurrencysInUSD);
router.get("/top-currencys-in-ars", cryptoController.getTopCurrencysInARS);
router.get(
  "/get-crypto-by-name",
  [validateRequest(getCryptoByNameSchema)],
  cryptoController.getCryptoByName
);

export default router;
