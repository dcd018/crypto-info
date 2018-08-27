import {parseArgs} from './config';
import Api from './api';

let providers;

try {
  providers = parseArgs();
} catch (e) {
  console.log(e.message);
  process.exit();
}

const work = Api.validateProviders(providers).then(Api.getInfo);

function resolve(data) {
  console.log(JSON.stringify(data, null, 2));
  process.exit();
}

function reject(err) {
  console.log(err);
  process.exit(1);
}

work.then(resolve).catch(reject);