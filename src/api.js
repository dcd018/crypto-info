import {api} from './config';
import rp from 'request-promise';

export default class Api {
  
  static async validateProviders (args) {
    let providers = await Api.httpRequest({resource: 'listings'});
    providers = providers.data.map(provider => ({name: provider.name.toLowerCase(), id: provider.id}));
    const invalid = args.filter(arg => providers.map(provider => provider.name).indexOf(arg) < 0);
    if (invalid.length) {
      throw new Error(`Invalid arguments in argument list: ${invalid.join(', ')}`);
    }
    return providers.filter(provider => args.indexOf(provider.name) > -1);
  }

  static async getInfo (providers) {
    const data = await Promise.all(providers.map(provider => Api.httpRequest({
      resource: `ticker/${provider.id}`
    })));
    return data.map(provider => provider.data);
  }

  static httpRequest (opts) {
    const {baseUri: apiUri, resource: apiResource} = api;
    let {method = 'GET', uri = apiUri, resource = apiResource, params} = opts;

    uri += `/${resource}`;
    const req = {uri};
    if (params && Object.keys(params).length) {
      switch (method) {
        case 'PATCH':
        case 'POST' :
        case 'PUT'  : req.body = params; break; 
        case 'GET'  : req.qs = params; break;
      }
    }

    req.json = true;
    return rp(req);
  }
}