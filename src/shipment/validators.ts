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

      console.log([startRange, endRange])

    return [
      zipCode <= startRange && zipCode >= endRange,
      IncompatibilitiesMessages.zipCodeOutsideDeliveryArea
    ]
  }
}

export {
  ZipCodeRangeAreaValidator,
}