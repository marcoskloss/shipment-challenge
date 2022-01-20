import { 
  Validator, 
  ShipmentMethod, 
  ShipmentValidatorOutput, 
  ShipmentInfo
} from '../types';

import { 
  IncompatibleMethodValidator,
  MinimumPriceValidator,
  ZipCodeRangeAreaValidator
} from './validators';

class ShipmentValidator {
  private validators: Validator[] = [];
  private shipmentInfo: ShipmentInfo;

  constructor(zipCode: string, price: number) {
    this.shipmentInfo = { price, zipCode };
    
    this.validators = [
      new IncompatibleMethodValidator(),
      new ZipCodeRangeAreaValidator(),
      new MinimumPriceValidator()
    ];
  }
  
  public validate(shipmentMethods: ShipmentMethod[]): ShipmentValidatorOutput[] {
    return shipmentMethods
      .map((shipmentMethod) => {
        const validations = this.validators.map((validator) => 
          validator.exec({ shipmentInfo: this.shipmentInfo, shipmentMethod })  
        );

        const incompatibilities = validations
          .filter(({ error }) => error)
          .map(item => item.message);

        return {
          incompatibilities,
          method: shipmentMethod.name,
          valid: incompatibilities.length === 0
        }
      })
  }
}

export { ShipmentValidator };