import pino from "pino";
import pinoPretty from "pino-pretty";

const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
  },
  process.env.NODE_ENV !== "production"
    ? pinoPretty({
        colorize: true,
      })
    : undefined
);
export default logger;
