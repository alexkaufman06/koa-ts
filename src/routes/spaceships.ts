import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.post(`/spaceships`, async (ctx: Context) => {
  try {
    ctx.status = 201;
    ctx.body = {
      spaceships: [ctx.request.body.spaceship]
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
