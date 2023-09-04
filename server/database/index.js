const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("server/raw-data/db.json");
const db = low(adapter);

// Set some defaults
db.defaults({ bugs: [], warning: "none" }).write();

module.exports = db;
