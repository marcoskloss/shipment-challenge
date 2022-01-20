import { ShipmentValidator } from "./shipment";

describe('ShipmentValidator', () => {
  it('should not pass the validation', () => {
    const methods = [{
      "name": "Entrega normal RJ", 
      "active": false, 
      "min_price_in_cents": 4500, 
      "range_postcode_valid": ["20000", "26600"]
    }];
    
    const zipCode =  '03108010';
    const price = 3000;
    
    const expectedIncompatibilities = [
      "Disabled shipping", 
      "Minimum price not reached for this method", 
      "Zip code outside the delivery area for this method"
    ]

    const shipmentValidator = new ShipmentValidator(zipCode, price);
    const [response] = shipmentValidator.validate(methods);

    expect(response.method).toBe(methods[0].name);
    expect(response.valid).toBeFalsy();
    expect(response.incompatibilities).toEqual(expect.arrayContaining(expectedIncompatibilities));
  });

  it('should pass the validation', () => {
    const methods = [{
      "name": "Entrega normal RJ", 
      "active": true, 
      "min_price_in_cents": 4500, 
      "range_postcode_valid": ["20000", "26600"]
    }];
    
    const zipCode = '21100';
    const price = 5000;

    const shipmentValidator = new ShipmentValidator(zipCode, price);
    const [response] = shipmentValidator.validate(methods);

    expect(response.valid).toBeTruthy();
    expect(response.incompatibilities.length).toBe(0);
  });
})