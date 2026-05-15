import { HashMap } from "ts-collections";

const map = new HashMap<string, number>();

map.put("apple", 10);
map.put("banana", 20);

console.log(map.get("apple"));
console.log(map.containsKey("banana"));

map.remove("banana");

console.log("Size:", map.size());
