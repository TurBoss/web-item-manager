module.exports = {
  dev: {
    app: {
      port: 6922
    },
    db: {
      users: './server/users.json'
    }
  }
}[process.env.NODE_ENV];