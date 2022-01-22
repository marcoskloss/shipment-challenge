import { ShipmentInfo, ShipmentMethod } from "../types";

type DataParserOutput = {
  methods: ShipmentMethod[];
  shipmentInfo: ShipmentInfo;
}

export function dataParser(data: string): DataParserOutput {
  const lines = data
    .split('\r\n')
    .filter(Boolean) // get only truthy values
    .map(line => line.trim());

  const firstBracketIndex = lines.indexOf('[');

  const rawStringMethods = lines.slice(firstBracketIndex).join('');
  const rawStringShipmentInfoList = lines.slice(0, firstBracketIndex);

 const [zipCode, price] =  rawStringShipmentInfoList
    .filter(line => !line.includes('#'))
    .map(line => line.split(':')[1].trim());
  
  return {
    methods: JSON.parse(rawStringMethods),
    shipmentInfo: {zipCode, price: Number(price)}
  };
}