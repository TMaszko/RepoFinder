import {IRow, ISortBySettings} from "../components/table/Table";
import {getColumnSortingDirection, getNextSortingDirection, sortByMultiplePropsComparator} from "../modules/table/sort";
import {SortDirs} from "../modules/table/SortDirs";

describe("Sorting feature", () => {
  it("Should return Sorting direction ascending if previous direction was none", () => {
    const result: SortDirs = getNextSortingDirection(SortDirs.NONE);
    expect(result).toBe(SortDirs.ASC);
  });

  it("Should return Sorting direction descending if previous direction was ascending", () => {
    const result: SortDirs = getNextSortingDirection(SortDirs.ASC);
    expect(result).toBe(SortDirs.DESC);
  });

  it("Should return none if previous direction was descending", () => {
    const result: SortDirs = getNextSortingDirection(SortDirs.DESC);
    expect(result).toBe(SortDirs.NONE);
  });
});

describe("get columns sorting direction", () => {
  const sortBy: ISortBySettings[] = [
    { columnKey: "title", sortDir: 0 },
    { columnKey: "owner", sortDir: 0 },
  ];
  it("should return SortDir.NONE if sortBy is empty", () => {
    const result: SortDirs = getColumnSortingDirection([], "title");
    expect(result).toBe(SortDirs.NONE);
  });
  it("should return valid sort direction if sortBy is an none empty array", () => {
    const result: SortDirs = getColumnSortingDirection(sortBy, "title");
    expect(result).toBe(SortDirs.ASC);
  });
  it("should return SortDir.NONE if sortBy array does not include element whith given column key", () => {
    const result: SortDirs = getColumnSortingDirection(sortBy, "id");
    expect(result).toBe(SortDirs.NONE);
  });
});

describe("sortByMultiplePropsComparator", () => {
  const firstRow: IRow = {
    ownerId: "",
    data: [
      { columnKey: "id", value: 4287921 },
      { columnKey: "title", value: "react" },
      { columnKey: "owner", value: "reactphp" },
      { columnKey: "stars", value: 6651 },
      { columnKey: "createdAt", value: "2012-05-10" },
    ],
    id: "4287921",
  };

  const secondRow: IRow = {
    ownerId: "",
    data: [
      { columnKey: "id", value: 10270250 },
      { columnKey: "title", value: "react" },
      { columnKey: "owner", value: "facebook" },
      { columnKey: "stars", value: 121302 },
      { columnKey: "createdAt", value: "2013-05-24" },
    ],
    id: "10270250",
  };

  it("should sort given rows ascending  ", () => {
    const sortBy: ISortBySettings[] = [
      { columnKey: "title", sortDir: SortDirs.ASC },
      { columnKey: "owner", sortDir: SortDirs.ASC },
    ];
    const result: IRow[] = [firstRow, secondRow].sort(
      sortByMultiplePropsComparator(sortBy),
    );
    expect(result).toEqual([secondRow, firstRow]);
  });

  it("should sort given rows descending", () => {
    const sortBy: ISortBySettings[] = [
      { columnKey: "title", sortDir: SortDirs.DESC },
      { columnKey: "owner", sortDir: SortDirs.DESC },
    ];
    const result: IRow[] = [firstRow, secondRow].sort(
      sortByMultiplePropsComparator(sortBy),
    );
    expect(result).toEqual([firstRow, secondRow]);
  });

  it("should return given array if sortBy is empty array", () => {
    const sortBy: ISortBySettings[] = [];
    const result: IRow[] = [firstRow, secondRow].sort(
      sortByMultiplePropsComparator(sortBy),
    );
    expect(result).toEqual([firstRow, secondRow]);
  });

  it("should return empty array if sortBy and rows array are empty arrays", () => {
    const sortBy: ISortBySettings[] = [];
    const result: IRow[] = [].sort(sortByMultiplePropsComparator(sortBy));
    expect(result).toEqual([]);
  });
});
