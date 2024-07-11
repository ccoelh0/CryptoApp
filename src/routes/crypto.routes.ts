import { Router } from "express";
import * as cryptoController from "../controller/crypto.controller";

const router = Router();

router.get("/top-currencys", cryptoController.getTopCurrencys);

export default router;
