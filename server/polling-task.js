const { getBugCount } = require("./bugs/api");
const { setBugCount } = require("./bugs/db");

function pollingTask() {
  setInterval(async () => {
    const countAll = await getBugCount("all");
    setBugCount({ count: countAll, type: "all", typeCN: "所有" });

    const countCritical = await getBugCount("critical");
    setBugCount({ count: countCritical, type: "critical", typeCN: "紧急" });

    const countHigh = await getBugCount("high");
    setBugCount({ count: countHigh, type: "high", typeCN: "高" });

    const countMiddle = await getBugCount("middle");
    setBugCount({ count: countMiddle, type: "middle", typeCN: "中" });

    const countLow = await getBugCount("low");
    setBugCount({ count: countLow, type: "low", typeCN: "低" });
  }, 60 * 1000);
}

module.exports = pollingTask;
