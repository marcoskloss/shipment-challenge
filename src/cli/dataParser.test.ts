import fs from 'fs';
import path from 'path';

import expectedMethods from '../../fixtures/methods.json';
import { dataParser } from './dataParser';

const fixturePath = path.resolve('fixtures','example.txt');


describe('DataParser', () => {
  it('should parse the given string', async () => {
    
    const data = fs.readFileSync(fixturePath);
    const { methods, shipmentInfo } = dataParser(data.toString());

    expect(shipmentInfo).toEqual(expect.objectContaining({
      zipCode: '95095230',
      price: 4000
    }));

    expect(methods).toEqual(expectedMethods);
  });
});