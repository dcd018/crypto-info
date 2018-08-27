'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArgs = exports.api = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = {
  baseUri: 'https://api.coinmarketcap.com/v2',
  resource: 'listings'
};

function parseArgs() {
  const argv = process.argv.slice(2);

  if (!argv.length) {
    throw new Error(_fs2.default.readFileSync(`${__dirname}/usage.txt`));
  }

  return argv.map(arg => arg.trim().toLowerCase());
}

exports.api = api;
exports.parseArgs = parseArgs;
//# sourceMappingURL=config.js.map