import { ArrayList } from "ts-collections";
import { LinkedQueue } from "ts-collections";

interface Task {
  id: number;
  name: string;
}

const queue = new LinkedQueue<Task>();

for (let i = 1; i <= 12; i++) {
  queue.offer({ id: i, name: `Task ${i}` });
}

const batchSize = 5;
const batch = new ArrayList<Task>();

let task: Task | undefined;

while ((task = queue.dequeue()) !== undefined) {
  batch.add(task);

  if (batch.size() === batchSize) {
    processBatch(batch);
    batch.clear();
  }
}

if (!batch.isEmpty()) {
  processBatch(batch);
}

function processBatch(batch: ArrayList<Task>) {
  console.log(`Processing ${batch.size()} tasks`);
}
