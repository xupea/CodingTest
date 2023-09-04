const dayjs = require("dayjs");
const db = require("../database");

function getBugCount(type) {
  const time = dayjs().format("YYYY/MM/DD");
  const value = db.get("bugs").find({ time, type }).value();
  return value;
}

function setBugCount({ count, type, typeCN }) {
  const time = dayjs().format("YYYY/MM/DD");
  if (db.get("bugs").find({ time, type }).value()) {
    db.get("bugs").find({ time }).assign({ count, type, typeCN }).write();
  } else {
    db.get("bugs").push({ time, count, type, typeCN }).write();
  }
}

function setMaxBugCount(count) {
  db.set("maxCount", count).write();
}

// all , critical, none
function setWaring(value) {
  db.set("warning", value).write();
}

function getBugHistory() {
  const value = db.get("bugs").value();
  return value;
}

module.exports = { getBugCount, setBugCount, getBugHistory, setWaring };
