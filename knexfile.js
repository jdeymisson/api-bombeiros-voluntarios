const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "bombeiros_db",
      user: "postgres",
      password: "12345678"
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    }
  }
};
