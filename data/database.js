const mongodb = require("mongodb");

const MongoClint = mongodb.MongoClient;
let database;

async function connection() {
  const clint = await MongoClint.connect("mongodb: //localhost:27017");
  database = clint.db("shop");
}

function getDb() {
  if (!database) {
    throw { message: "Database is not Connected" };
  }
  return database;
}

module.exports = {
  connection: connection,
  getDb: getDb,
};
