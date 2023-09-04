const Koa = require("koa");
const koaBody = require("koa-body").default;
const cors = require("@koa/cors");
const pollingTask = require("./polling-task");

require("dotenv").config();

require("./database");

// start polling
pollingTask();

const app = new Koa();

app.use(cors());
app.use(koaBody());

const bugs = require("./bugs/route");

app.use(bugs.routes());

app.listen(3010);
