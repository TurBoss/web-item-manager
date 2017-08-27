module.exports = {
  development: {
    app: {
      port: 6922
    },
    db: {
      users: './server/users.json'
    }
  },
  test: {
    app: {
      port: 12336
    },
    db: {
      users: './server/tests/users-test.json'
    }
  }
}[process.env.NODE_ENV];
