import { LinkedStack } from "ts-collections";

const stack = new LinkedStack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());

while (!stack.isEmpty()) {
  console.log(stack.pop());
}