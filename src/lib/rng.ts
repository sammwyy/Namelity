import { Color } from "./colors";

function generateSeed(str: string): number {
  let seed = 0;
  for (let i = 0; i < str.length; i++) {
    seed = (seed * 31 + str.charCodeAt(i)) & 0x7fffffff;
  }
  return seed;
}

export default class RNG {
  private seed: number;
  private state: number;

  constructor(seed: number | string) {
    this.seed = typeof seed === "string" ? generateSeed(seed) : seed;
    this.state = this.seed;
  }

  next(): number {
    this.state = (this.state * 1103515245 + 12345) % 0x80000000;
    return this.state;
  }

  nextColor(): Color {
    return {
      r: this.next() % 256,
      g: this.next() % 256,
      b: this.next() % 256,
    };
  }

  nextFloat(): number {
    return this.next() / 0x80000000;
  }

  nextInt(min: number, max: number): number {
    return min + Math.floor(this.nextFloat() * (max - min));
  }

  nextBoolean(): boolean {
    return this.next() % 2 === 0;
  }

  choose<T>(array: T[]): T {
    return array[this.nextInt(0, array.length)];
  }

  chooseUnique<T>(array: T[], count: number): T[] {
    const copy = array.slice();
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      const index = this.nextInt(0, copy.length);
      result.push(copy[index]);
      copy.splice(index, 1);
    }
    return result;
  }

  shuffle<T>(array: T[]): T[] {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  clone(): RNG {
    const clone = new RNG(this.seed);
    clone.state = this.state;
    return clone;
  }
}
