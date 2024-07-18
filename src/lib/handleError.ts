import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "http-status";
import { isHttpError } from "../config/http";
import ApiError from "./apiError";

export type HandleError = typeof handleError;

export const handleError = (error: any) => {
  let code: string | undefined,
    message: string | undefined,
    status: number | undefined;

  const httpError = isHttpError(error);

  if (httpError) {
    const { code: httpCode, message: httpMsg, response } = error;
    code = httpCode;
    message = httpMsg;
    status = response?.status;
  }

  throw new ApiError(
    status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message || "Internal server error",
    code || "internal-server-error"
  );
};

export const tryCatch =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((e: ApiError) =>
      res
        .status(e.statusCode)
        .send({ success: false, message: e.message, code: e.code || undefined })
    );
