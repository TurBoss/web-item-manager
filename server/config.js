module.exports = {
  development: {
    app: {
      port: 6922
    },
    db: {
      path: './server/database/tests.sqlite',
      users: './server/users.json'
    }
  },
  test: {
    app: {
      port: 12336
    },
    db: {
      path: './server/database/tests.sqlite',
      users: './server/tests/users-test.json'
    }
  }
}[process.env.NODE_ENV];
