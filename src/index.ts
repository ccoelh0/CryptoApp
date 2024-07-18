import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import routes from "./routes/index.routes";
import httpStatus from "http-status";
import env from "./config/env";
import logger from "./lib/logger";

const app = express();

app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use((req, _res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// api routes
app.use(routes);

// unknown api request
app.use((_req, res) => {
  logger.error("=== Api req not found ===");
  res.sendStatus(httpStatus.NOT_FOUND);
});

app.listen(env.port, () => {
  logger.info(`Server is running on http://localhost:${env.port}`);
});
