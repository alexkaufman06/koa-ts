import Router from 'koa-router';

const router = new Router();

router.get(`/healthcheck`, async (ctx) => {
  try {
    ctx.body = {
      status: "success",
      data: "It works!"
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;

