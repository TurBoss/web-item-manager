module.exports = {
  development: {
    app: {
      port: 6922
    },
    db: {
      path: './server/database/test-db.sqlite',
      opts: {
        memory: true
      }
    }
  },
  test: {
    app: {
      port: 12336
    },
    db: {
      path: './server/database/test-db.sqlite',
      opts: {
        memory: true
      }
    }
  }
}[process.env.NODE_ENV];
