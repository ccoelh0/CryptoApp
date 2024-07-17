import { Request, Response } from "express";
import FileUploader from "../services/files.service";
import httpStatus from "http-status";

export const saveFile = [
  FileUploader.validateFileKey,
  (req: Request, res: Response) => {
    const uploader = new FileUploader();

    uploader.uploadFunc()(req, res, (err) => {
      if (!err) res.sendStatus(httpStatus.CREATED);

      res
        .status(err?.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: err?.message || "Bad request", success: false });
    });
  },
];
