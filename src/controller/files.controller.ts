import { Request, Response } from "express";
import FileUploader from "../services/files.service";
import httpStatus from "http-status";
import logger from "../lib/logger";

export const saveFile = (req: Request, res: Response) => {
  logger.info("=== Saving file ===");
  const uploader = new FileUploader();

  uploader.uploadFunc()(req, res, (err) => {
    if (!err) return res.sendStatus(httpStatus.CREATED);

    return res
      .status(err?.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: err?.message || "Bad request", success: false });
  });
};
