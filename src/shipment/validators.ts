import { Validator, ValidatorInput, ValidatorOutput } from "../types";

enum IncompatibilitiesMessages {
  disabledShipping = 'Disabled shipping',
  minimumPriceNotReached = 'Minimum price not reached for this method',
  zipCodeOutsideDeliveryArea = 'Zip code outside the delivery area for this method'
}

class ZipCodeRangeAreaValidator implements Validator {
  public exec({ shipmentMethod, shipmentInfo }: ValidatorInput): ValidatorOutput {
    const zipCode = Number(shipmentInfo.zipCode);

    const [startRange, endRange] = shipmentMethod
      .range_postcode_valid
      .map(Number);

    return {
      error: zipCode <= startRange && zipCode >= endRange,
      message: IncompatibilitiesMessages.zipCodeOutsideDeliveryArea
    }
  }
}

class MinimumPriceValidator implements Validator {
  public exec({ shipmentMethod, shipmentInfo }: ValidatorInput): ValidatorOutput {
    console.log({ shipmentMethod })
    
    return {
      error: shipmentInfo.price < shipmentMethod.min_price_in_cents,
      message: IncompatibilitiesMessages.minimumPriceNotReached
    }
  }
}

class IncompatibleMethodValidator implements Validator {
  public exec({ shipmentMethod }: ValidatorInput): ValidatorOutput {
    console.log(shipmentMethod)
    
    return {
      error: !shipmentMethod.active, 
      message: IncompatibilitiesMessages.disabledShipping
    }
  }
}


export {
  ZipCodeRangeAreaValidator,
  MinimumPriceValidator,
  IncompatibleMethodValidator
}