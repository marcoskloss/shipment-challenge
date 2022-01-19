import methods  from '../../fixtures/methods.json';
import { ZipCodeRangeAreaValidator, MinimumPriceValidator } from "./validators";

const shipmentInfo = {
  price: 4000,
  zipCode: '19999998',
}
const method = methods[0];

describe('ZipCodeRangeAreaValidator', () => {
  const zipCodeRangeAreaValidator = new ZipCodeRangeAreaValidator();
  
  describe('should pass the validation', () => {
    it('zip code: 19999999', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '19999999' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('zip code: 19999998', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '19999998' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });
    
    it('zip code: 01000000', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '01000000' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('zip code: 01000001', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '01000001' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });
  });

  describe('should not pass the validation', () => {
    it('zip code: 20000000', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '20000000' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('zip code: 00000000', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '00000000' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('zip code: 00999999', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '00999999' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
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
      
      const [error] = minimumPriceValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it('price: 2', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: 2 }, 
        shipmentMethod: method
      }
      
      const [error] = minimumPriceValidator.exec(params);

      expect(error).toBeFalsy();
    });
  });

  describe('should not pass the validation', () => {
    it('price: 0', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: 0 }, 
        shipmentMethod: method
      }
      
      const [error] = minimumPriceValidator.exec(params);

      expect(error).toBeTruthy();
    });

    it('price: -1', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, price: -1 }, 
        shipmentMethod: method
      }
      
      const [error] = minimumPriceValidator.exec(params);

      expect(error).toBeTruthy();
    });
  });
})