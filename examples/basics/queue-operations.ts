import { LinkedQueue } from "ts-collections" ;

const queue = new LinkedQueue<string>();

queue.offer('Task 1');
queue.offer('Task 2');
queue.offer('Task 3');

while (!queue.isEmpty()) {
  console.log(queue.dequeue());
}