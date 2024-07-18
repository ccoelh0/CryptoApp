import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from "joi";

interface IMiddleware {
  schema: Joi.ObjectSchema<any>;
  where: "body" | "query" | "params" | "headers";
}

export const getCryptoByNameSchema = {
  schema: Joi.object({
    name: Joi.string().required(),
  }),
  where: "query",
} as const;

const validateRequest = ({ schema, where }: IMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[where]);

    if (!error) return next();

    return res.status(httpStatus.BAD_REQUEST).json({
      message: `${error.details[0]?.message} in ${where}` || error.details,
    });
  };
};

export default validateRequest;
