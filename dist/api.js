'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _config = require('./config');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Api {

  static async validateProviders(args) {
    let providers = await Api.httpRequest({ resource: 'listings' });
    providers = providers.data.map(provider => ({ name: provider.name.toLowerCase(), id: provider.id }));
    const invalid = args.filter(arg => providers.map(provider => provider.name).indexOf(arg) < 0);
    if (invalid.length) {
      throw new Error(`Invalid arguments in argument list: ${invalid.join(', ')}`);
    }
    return providers.filter(provider => args.indexOf(provider.name) > -1);
  }

  static async getInfo(providers) {
    const data = await (0, _bluebird.all)(providers.map(provider => Api.httpRequest({
      resource: `ticker/${provider.id}`
    })));
    return data.map(provider => provider.data);
  }

  static httpRequest(opts) {
    const { baseUri: apiUri, resource: apiResource } = _config.api;
    let { method = 'GET', uri = apiUri, resource = apiResource, params } = opts;

    uri += `/${resource}`;
    const req = { uri };
    if (params && Object.keys(params).length) {
      switch (method) {
        case 'PATCH':
        case 'POST':
        case 'PUT':
          req.body = params;break;
        case 'GET':
          req.qs = params;break;
      }
    }

    req.json = true;
    return (0, _requestPromise2.default)(req);
  }
}
exports.default = Api;
//# sourceMappingURL=api.js.map