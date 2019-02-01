export const zip: <T, P, R>(firstArray: T[], secondArray: P[], fn: (el1: T, el2: P) => R) => R[] =
  <T, P, R>(firstArray: T[], secondArray: P[], fn: (el1: T, el2: P) => R): R[] => {
    const results: R[] = [];
    const smallerLength: number = Math.min(firstArray.length, secondArray.length);
    for (let i: number = 0; i < smallerLength; i++) {
      results.push(fn(firstArray[i], secondArray[i]));
    }
    return results;
  };
