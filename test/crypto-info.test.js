import {parseArgs} from '../src/config';
import Api from '../src/api';

process.argv.push('Bitcoin', 'Ethereum');

describe("crypto-info", () => {

  let providers, argv = process.argv.slice(2);

  it("should parse command line arguments", () => {
    providers = parseArgs();

    if (argv.length) {
      expect(providers[0]).toBe(argv[0].toLowerCase());
      expect(providers[1]).toBe(argv[1].toLowerCase());
    }
    else {
      expect(providers[0]).toBe('bitcoin');
      expect(providers[1]).toBe('ethereum');
    }
  });

  it("should validate available providers against arguments and return ids", async () => {
    providers = await Api.validateProviders(providers);
    expect(providers.map(provider => provider.id).length).toBe((argv.length) ? argv.length : 2);
  });

  it("should return a list of provider specific information", async () => {
    providers = await Api.getInfo(providers);
    expect(providers.length).toBe((argv.length) ? argv.length : 2);
  });
});