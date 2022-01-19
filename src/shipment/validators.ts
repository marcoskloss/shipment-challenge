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

    return [
      zipCode <= startRange && zipCode >= endRange,
      IncompatibilitiesMessages.zipCodeOutsideDeliveryArea
    ]
  }
}

class MinimumPriceValidator implements Validator {
  public exec({ shipmentMethod, shipmentInfo }: ValidatorInput): ValidatorOutput {
    console.log({ shipmentMethod })
    
    return [
      shipmentInfo.price < shipmentMethod.min_price_in_cents,
      IncompatibilitiesMessages.minimumPriceNotReached
    ]
  }
}

export {
  ZipCodeRangeAreaValidator,
  MinimumPriceValidator
}