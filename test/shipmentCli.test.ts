import { execSync } from 'child_process';

import expected from './fixtures/cli-expected.json'


describe('ShipmentCli', () => {
  it('should read data from stdin, parse, validate and write in stdout', () => {
    const result = execSync('cat fixtures/example.txt | node dist/src/cli/cli.js');

    expect(result.toString()).toEqual(JSON.stringify(expected));
  });
});



