import { Router } from "express";
import * as filesController from "../controller/files.controller";

const router = Router();

router.post("/save-file", filesController.saveFile);

export default router;
