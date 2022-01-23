import process from 'process';
import { ShipmentValidator } from '../shipment/shipment';

import { dataParser } from './dataParser';

async function stdinReader(): Promise<string> {
  const data: string[] = [];
  
  process.stdin.on('data', (chunk) => {
    data.push(chunk.toString());
  });

  return new Promise((resolve, reject) => {
    process.stdin.on('close', (err) => {
      if (err) {
        return reject('Error when reading file.');
      }

      resolve(data.join(''));
    });
  });
}


async function shipmentValidatorCli(): Promise<void> {
  const data = await stdinReader();

  const { methods, shipmentInfo } = dataParser(data);

  const shipmentValidator = new ShipmentValidator(
    shipmentInfo.zipCode,
    shipmentInfo.price
  );

  const result = shipmentValidator.validate(methods);

  process.stdout.write(JSON.stringify(result), () => {
    process.exit();
  });
}

shipmentValidatorCli();