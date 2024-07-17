import "dotenv/config";
import Joi from "joi";

interface IEnv {
  cryptoApiKey: string;
}

const schema = Joi.object()
  .keys({
    CRYPTO_API_KEY: Joi.string().required().description("Crypto API KEY"),
  })
  .unknown();

const { value, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) throw new Error(`Error in .env: ${error}`);

export default {
  cryptoApiKey: value.CRYPTO_API_KEY,
} as IEnv;
