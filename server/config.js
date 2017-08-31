module.exports = {
  development: {
    app: {
      port: 6922
    },
    db: {
      path: './server/database/tests.sqlite'
    }
  },
  test: {
    app: {
      port: 12336
    },
    db: {
      path: './server/database/tests.sqlite'
    }
  }
}[process.env.NODE_ENV];
