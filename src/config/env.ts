import "dotenv/config";
import Joi from "joi";

interface IEnv {
  cryptoApiKey: string;
  port: number;
}

const schema = Joi.object()
  .keys({
    CRYPTO_API_KEY: Joi.string().required().description("Crypto API KEY"),
    PORT: Joi.number().optional().default(5420),
  })
  .unknown();

const { value, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) throw new Error(`Error in .env: ${error}`);

export default {
  cryptoApiKey: value.CRYPTO_API_KEY,
  port: value.PORT,
} as IEnv;
