export const zip: <FirstArrayItemType, SecondArrayItemType, ReturnArrayItemType>
  (
  firstArray: FirstArrayItemType[],
  secondArray: SecondArrayItemType[],
  fn: (el1: FirstArrayItemType, el2: SecondArrayItemType) => ReturnArrayItemType,
) => ReturnArrayItemType[] =
  <FirstArrayItemType, SecondArrayItemType, ReturnArrayItemType>(
    firstArray: FirstArrayItemType[],
    secondArray: SecondArrayItemType[],
    fn: (el1: FirstArrayItemType, el2: SecondArrayItemType) => ReturnArrayItemType,
  ): ReturnArrayItemType[] => {
    const results: ReturnArrayItemType[] = [];
    const smallerLength: number = Math.min(firstArray.length, secondArray.length);
    for (let i: number = 0; i < smallerLength; i++) {
      results.push(fn(firstArray[i], secondArray[i]));
    }
    return results;
  };
