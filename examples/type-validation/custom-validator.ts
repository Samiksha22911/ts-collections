import { ArrayList } from "ts-collections";

class ValidatedList<T> extends ArrayList<T> {
  private validator: (v: T) => boolean;

  constructor(validator: (v: T) => boolean) {
    super();
    this.validator = validator;
  }

  override add(value: T): boolean {
    if (!this.validator(value)) {
      throw new Error("Validation failed");
    }
    return super.add(value);
  }
}

const evenList = new ValidatedList<number>((num) => num % 2 === 0);

evenList.add(2);
evenList.add(4);

console.log("Added valid numbers successfully");

try {
  evenList.add(3);
} catch (error) {
  console.log("Error:", (error as Error).message);
}
