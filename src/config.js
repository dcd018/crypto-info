import fs from 'fs';

const api = {
  baseUri: 'https://api.coinmarketcap.com/v2',
  resource: 'listings'
};

function parseArgs () {
  const argv = process.argv.slice(2);

  if (!argv.length) {
    throw new Error(fs.readFileSync(`${__dirname}/usage.txt`));
  }

  return argv.map(arg => arg.trim().toLowerCase());
}

export {
  api,
  parseArgs
};