import winston from "winston";
import chalk from "chalk";

const COLORS = {
  info: "green",
  error: "red",
} as const;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...args } = info;

      return (
        chalk[level === "info" ? COLORS.info : COLORS.error](
          `[${timestamp}] - ${level}`
        ) +
        `: ${message} ${
          Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
        }`
      );
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
