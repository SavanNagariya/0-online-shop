const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session");

createSessionStore = () => {
  const MongoDBStore = mongoDBStore(session);
  const storeDb = new MongoDBStore({
    url: "mongodb://localhost:27017",
    databaseName: "shop",
    collection: "sessions",
  });
  return storeDb;
};

createSessionConfig = () => {
  return {
    secret: "online-shopping",
    store: createSessionStore(),
    resave: false,
    saveUninitialized: false,
  };
};

module.exports = createSessionConfig;
