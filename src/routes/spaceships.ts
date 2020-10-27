import { AddSpaceshipRequest } from "./../request/AddSpaceshipRequest";
import { Context } from "koa";
import Router from "koa-router";
import { redisStorage as storage } from "../storage/redis";
import { validate } from "class-validator";

const router = new Router();

router.post(`/spaceships`, async (ctx: Context) => {
  try {
    const validatorOptions = {};
    const game = new AddSpaceshipRequest();
    game.name = ctx.request.body.name || "";

    const errors = await validate(game, validatorOptions);

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        data: errors
      };

      return ctx;
    }

    ctx.status = 201;
    ctx.body = {
      spaceships: await storage().get("spaceship_list")
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
