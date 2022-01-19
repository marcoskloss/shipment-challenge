import methods  from '../../fixtures/methods.json';
import { ZipCodeRangeAreaValidator } from "./validators";

const shipmentInfo = {
  price: 4000,
  zipCode: '19999998',
}

describe('ZipCodeRangeAreaValidator', () => {
  const zipCodeRangeAreaValidator = new ZipCodeRangeAreaValidator();
  const method = methods[0];
  
  describe('should pass the validation', () => {
    it('zip code: 19999999', () => {
      const params = { 
        shipmentInfo: { ...shipmentInfo, zipCode: '19999999' }, 
        shipmentMethod: method
      }
      
      const [error] = zipCodeRangeAreaValidator.exec(params);

      expect(error).toBeFalsy();
    });

    it.todo('zip code: 19999998');
    it.todo('zip code: 01000000');
    it.todo('zip code: 01000001');
  });

  describe('should not pass the validation', () => {
    it.todo('zip code: 20000000');
    it.todo('zip code: 00000000')
    it.todo('zip code: 00999999');
  });
});