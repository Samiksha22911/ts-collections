import type { Deque } from "../interfaces";
import { AbstractQueue, type TypeValidationOptions } from "./AbstractQueue";

export type { TypeValidationOptions };

/**
 * Abstract base class for Deque implementations.
 *
 * Provides Queue compatibility defaults:
 * - offer() delegates to offerLast()
 * - dequeue()/poll() delegate to pollFirst()
 * - element() delegates to getFirst()
 * - peek() delegates to peekFirst()
 *
 * @template E The type of elements in this deque
 */
export abstract class AbstractDeque<E> extends AbstractQueue<E> implements Deque<E> {
  constructor(options?: TypeValidationOptions<E>) {
    super(options);
  }

  abstract addFirst(element: E): void;

  abstract addLast(element: E): void;

  abstract offerFirst(element: E): boolean;

  abstract offerLast(element: E): boolean;

  abstract removeFirst(): E;

  abstract removeLast(): E;

  abstract pollFirst(): E | undefined;

  abstract pollLast(): E | undefined;

  abstract getFirst(): E;

  abstract getLast(): E;

  abstract peekFirst(): E | undefined;

  abstract peekLast(): E | undefined;

  override offer(element: E): boolean {
    return this.offerLast(element);
  }

  override dequeue(): E | undefined {
    return this.pollFirst();
  }

  override poll(): E | undefined {
    return this.pollFirst();
  }

  override element(): E {
    return this.getFirst();
  }

  override peek(): E | undefined {
    return this.peekFirst();
  }
}
