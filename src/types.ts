export type ShipmentMethod = {
    name: string;
    active: boolean;
    min_price_in_cents: number;
    range_postcode_valid: string[];
}

export type ShipmentInfo = {
    zipCode: string;
    price: number;
}

export type ValidatorInput = {
    shipmentMethod: ShipmentMethod;
    shipmentInfo: ShipmentInfo;
}

export type ValidatorOutput = [error: boolean, message: string];

export interface Validator {
    exec(data: ValidatorInput): ValidatorOutput;
}

export type ShipmentValidatorOutput = {
    method: string;
    valid: boolean;
    incompatibilities: string[];
}

