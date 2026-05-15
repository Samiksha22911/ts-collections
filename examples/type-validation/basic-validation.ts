import { ArrayList } from "ts-collections";

function validateNumber(value: any): number {
  if (typeof value !== 'number') {
    throw new Error('Value must be a number');
  }
  return value;
}

const list = new ArrayList<number>();

list.add(validateNumber(10));
list.add(validateNumber(20));

console.log(list.size());