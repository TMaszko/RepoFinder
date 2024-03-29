import {ICell, IRow, ISortBySettings} from "../../components/table/Table";
import {SortDirs} from "./SortDirs";

export const sortByMultiplePropsComparator: (sortBySettings: ISortBySettings[]) => (a: IRow, b: IRow) => number =
  sortBySettings => (a, b): number => {

    if (sortBySettings.length === 0) {
      return 0;
    }
    const { sortDir, columnKey } = sortBySettings[0];
    const aValue: string | number | boolean | Date = (a.data.find(el => el.columnKey === columnKey) as ICell).value;
    const bValue: string | number | boolean | Date = (b.data.find(el => el.columnKey === columnKey) as ICell).value;
    let comparisionResult: number = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    if (typeof aValue === "string" && typeof bValue === "string") {
      const aValueString: string = aValue.toString().toLowerCase();
      const bValueString: string = bValue.toString().toLowerCase();
      comparisionResult = aValueString > bValueString ? 1 : aValueString < bValueString ? -1 : 0;
    }

    if (sortDir === SortDirs.NONE || comparisionResult === 0) {
      return sortByMultiplePropsComparator(sortBySettings.slice(1))(a, b);
    } else if (sortDir === SortDirs.ASC) {
      return comparisionResult;
    } else {
      return comparisionResult * -1;
    }
  };

export const getColumnSortingDirection: (sortBy: ISortBySettings[], columnKey: string) => SortDirs = (sortBy, columnKey) => {
  const possibleSortDir: ISortBySettings | undefined = sortBy.find(el => el.columnKey === columnKey);
  return possibleSortDir ? possibleSortDir.sortDir : SortDirs.NONE;
};

export const getNextSortingDirection: (sortDir: SortDirs) => SortDirs = sortDir => {
  switch (sortDir) {
    case SortDirs.DESC: {
      return SortDirs.NONE;
    }
    case SortDirs.ASC: {
      return SortDirs.DESC;
    }
    case SortDirs.NONE: {
      return SortDirs.ASC;
    }

    default: {
      return sortDir;
    }
  }
};
