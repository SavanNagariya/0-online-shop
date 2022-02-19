const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let database;

async function connection() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("shop");
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
