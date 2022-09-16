"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line
var _database = require('./knex/config/database'); var _database2 = _interopRequireDefault(_database);
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const port = process.env.APP_PORT;
_app2.default.listen(port, async () => {
  const resp = await _database2.default.call(void 0, 'Questionaries');
  console.log(`Server started in port ${port}`);
  console.log(resp);
});
