const Router = require("koa-router");
const { getBugCount, getBugHistory } = require("./db");

const router = new Router({
  prefix: "/bugs",
});

router.get("/", (ctx, next) => {
  const { type } = ctx.request.query;
  const count = getBugCount(type);
  ctx.body = count;
  next();
});

router.get("/history", (ctx, next) => {
    const data = getBugHistory();
    ctx.body = data;
    next();
  });

module.exports = router;
