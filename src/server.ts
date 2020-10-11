import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

const app = new Koa();

const PORT = process.env.PORT || 7654;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());

// TEMP
const router = new Router();

router.get(`/`, async (ctx) => {
  try {
    ctx.body = {
      status: "success",
    };
  } catch (err) {
    console.error(err);
  }
});

app.use(router.routes());
// TEMP

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;