// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./gpDev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/gpTest.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/testmigrate/migrations"
    },
    seeds: {
      directory: "./data/testseed/seeds"
    }
  }
};