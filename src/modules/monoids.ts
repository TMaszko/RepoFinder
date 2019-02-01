
interface IMonoid<V> {
  combine(other: IMonoid<V>): IMonoid<V>;
}

export class ComparatorMonoid<V> implements IMonoid<(a: V, b: V) => number> {
  private compare: (a: V, b: V) => number;

  constructor(compare: (a: V, b: V) => number) {
    this.compare = compare;
  }

  public combine(other: ComparatorMonoid<V>): ComparatorMonoid<V> {

    return new ComparatorMonoid<V>((a: V, b: V): number => {

      const res: number = this.compare(a, b);

      if (res === 0) {
        return other.comparator()(a, b);
      } else {
        return res;
      }
    });
  }

  public comparator(): (a: V, b: V) => number {
    return this.compare;
  }
}
