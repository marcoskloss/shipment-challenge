import methods  from '../../fixtures/methods.json';
import { 
  ZipCodeRangeAreaValidator, 
  MinimumPriceValidator, 
  IncompatibleMethodValidator 
} from "./validators";

const shipmentInfo = {
  price: 4000,
  zipCode: '19999998',
}
const method = methods[0];

describe('ZipCodeRangeAreaValidator', () => {
  const zipCodeRangeAreaValidator = new ZipCodeRangeAreaValidator();
  
  describe('should pass the validation', () => {
    it('zip code lower than max', () => {
      const zipCode = String(Number(method.range_postcode_valid[1]) - 1);

      
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode }, 
        shipmentMethod: method
      }
      
      const { error } = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('zip code equals max', () => {
      const zipCode = String(Number(method.range_postcode_valid[1]));

      
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode }, 
        shipmentMethod: method
      }
      
      const { error } = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });
    
    it('zip code greater than min', () => {
      const zipCode = String(Number(method.range_postcode_valid[0]) + 1);
      
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode }, 
        shipmentMethod: method
      }
      
      const { error } = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('zip code equals min', () => {
      const zipCode = String(Number(method.range_postcode_valid[0]));

      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode }, 
        shipmentMethod: method
      }
      
      const { error } = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });
  });

  describe('should not pass the validation', () => {
    it('zip code greater than max', () => {
      const zipCode = String(Number(method.range_postcode_valid[1]) + 1);

      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode }, 
        shipmentMethod: method
      }
      
      const { error } = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeTruthy();
    });

    it('zip code lower than min', () => {
      const zipCode = String(Number(method.range_postcode_valid[0]) - 1);
      
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode }, 
        shipmentMethod: method
      }
      
      const { error } = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeTruthy();
    });
  });
});

describe('MinimumPriceValidator', () => {
  const minimumPriceValidator = new MinimumPriceValidator();

  describe('should pass the validation', () => {
    it('price: 1', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: 1 }, 
        shipmentMethod: method
      }
      
      const { error } = minimumPriceValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('price: 2', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: 2 }, 
        shipmentMethod: method
      }
      
      const { error } = minimumPriceValidator.exec(params);

      expect(error).toBeFalsy();
    });
  });

  describe('should not pass the validation', () => {
    it('price: 0', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: 0 }, 
        shipmentMethod: method
      }
      
      const { error } = minimumPriceValidator.exec(params);

      expect(error).toBeTruthy();
    });

    it('price: -1', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: -1 }, 
        shipmentMethod: method
      }
      
      const { error } = minimumPriceValidator.exec(params);

      expect(error).toBeTruthy();
    });
  });
})

describe('IncompatibleMethodValidator', () => {
  const incompatibleMethodValidator = new IncompatibleMethodValidator();

  describe('should pass the validation', () => {
    it('active: true', () => {
      const params = { 
        shipmentInfo, 
        shipmentMethod: { ...method, active: true }
      }
      
      const { error } = incompatibleMethodValidator.exec(params);

      expect(error).toBeFalsy();
    });
  });

  describe('should not pass the validation', () => {
    it('active: false', () => {
      const params = { 
        shipmentInfo, 
        shipmentMethod: { ...method, active: false }
      }

      
      const { error } = incompatibleMethodValidator.exec(params);

      expect(error).toBeTruthy();
    });
  });
})