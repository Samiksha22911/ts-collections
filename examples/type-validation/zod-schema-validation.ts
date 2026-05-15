import { ArrayList } from "ts-collections";
import { z } from "zod";

const list = new ArrayList<number>();

const schema = z.number().positive();

function validate(n: number) {
  return schema.parse(n);
}

list.add(validate(10));

try {
  list.add(validate(-5));
} catch (e: any) {
  console.log("Validation error:", e.message);
}
