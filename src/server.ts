import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { config } from './config';
import cors from "koa2-cors";
import healthcheck from "./routes/healthcheck";
import logger from "koa-logger";

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());
app.use(healthcheck.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;