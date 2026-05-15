import { ArrayList } from "ts-collections";

const list = new ArrayList<number>();

function validate(n: number) {
  if (n <= 0) throw new Error('Must be positive');
  return n;
}

list.add(validate(10));

try {
  list.add(validate(-5));
} catch (e: any) {
  console.log('Validation error:', e.message);
}