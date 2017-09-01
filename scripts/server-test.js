process.env.NODE_ENV = 'test';

const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const db = require('../server/utils/database');

db.init();
db.insertUser({ name: 'test', password: '123', admin: true, test: false });
db.insertUser({ name: 'test2', password: '123', admin: false, test: false });

const mocha = new Mocha();
const testDir = './server/tests';

fs.readdirSync(testDir)
  .filter(f => f.substr(-3) === '.js')
  .forEach(f => mocha.addFile(path.join(testDir, f)));

mocha.run((fail) => {
  process.on('exit', () => {
    process.exit(fail);
  });
});
