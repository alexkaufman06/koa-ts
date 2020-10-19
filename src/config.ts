import * as Interfaces from "./types/interfaces";

export const config: Interfaces.Config = {
  port: process.env.PORT || "7654",
  redis: {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: (process.env.REDIS_PORT && parseInt(process.env.REDIS_PORT)) || 6401
  }
};
