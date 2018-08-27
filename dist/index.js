'use strict';

var _config = require('./config');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let providers;

try {
  providers = (0, _config.parseArgs)();
} catch (e) {
  console.log(e.message);
  process.exit();
}

const work = _api2.default.validateProviders(providers).then(_api2.default.getInfo);

function resolve(data) {
  console.log(JSON.stringify(data, null, 2));
  process.exit();
}

function reject(err) {
  console.log(err);
  process.exit(1);
}

work.then(resolve).catch(reject);
//# sourceMappingURL=index.js.map