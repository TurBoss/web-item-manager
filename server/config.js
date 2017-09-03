module.exports = {
  development: {
    app: {
      port: 6922
    },
    db: {
      path: './server/database/test.sqlite',
      opts: {
        memory: false
      }
    }
  },
  test: {
    app: {
      port: 12336
    },
    db: {
      path: './server/database/test.sqlite',
      opts: {
        memory: false
      }
    }
  }
}[process.env.NODE_ENV];
