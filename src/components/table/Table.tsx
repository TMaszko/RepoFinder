import * as React from "react";

import {SortDirs} from "../../modules/table/SortDirs";
import Arrow from "./Arrow";
import ArrowsWrapper from "./ArrowsWrapper";
import TableWrapper from "./TableWrapper";

export interface ICell {
  columnKey: string;
  value: string | number | boolean | Date;
}

export interface IRow {
  data: ICell[];
  id: string;
}

export interface IWithItems<ItemType> {
  items: ItemType[];
}

export interface IColumn {
  columnKey: string;
  header: string;
}

export interface ISortBySettings {
  columnKey: string;
  sortDir: SortDirs;
}

export interface ITableProps extends IWithItems<IRow> {
  columnsHeaders: IColumn[];
  sortBy: ISortBySettings[];
  onSortChange?: (column: ISortBySettings) => void;
}

type IProps = ITableProps;

const getColumnSortingDirection: (sortBy: ISortBySettings[], columnKey: string) => SortDirs = (sortBy, columnKey) => {
  const possibleSortDir: ISortBySettings | undefined = sortBy.find(el => el.columnKey === columnKey);
  return possibleSortDir ? possibleSortDir.sortDir : SortDirs.NONE;
};

const getNextSortingDirection: (sortDir: SortDirs) => SortDirs = sortDir => {
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

export class Table extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    console.log("RERENDER");

    return (
      <TableWrapper>
        <table>
          <thead>
            <tr>
              {this.props.items.length !== 0 && this.props.columnsHeaders.map(({ columnKey, header }) =>
                <th className="header-cell" key={columnKey}>
                  <div className="header-wrapper">
                    {header}
                    {!!this.props.onSortChange && <ArrowsWrapper>
                      <Arrow
                        onClick={() => this.onSortChangeTable(columnKey)}
                        disabledSorting={getColumnSortingDirection(this.props.sortBy, columnKey) === SortDirs.NONE
                          || getColumnSortingDirection(this.props.sortBy, columnKey) === SortDirs.DESC}
                        top
                      >
                      </Arrow>
                      <Arrow
                        bottom
                        onClick={() => this.onSortChangeTable(columnKey)}
                        disabledSorting={getColumnSortingDirection(this.props.sortBy, columnKey) === SortDirs.NONE
                          || getColumnSortingDirection(this.props.sortBy, columnKey) === SortDirs.ASC}
                      >
                      </Arrow>
                    </ArrowsWrapper>
                    }
                  </div>
                </th>,
              )}
            </tr>
          </thead>
          <tbody>
            {this.props.items
              .map(({ data, id }) =>
                <tr className="row" key={id}>
                  {data.map((el, i) =>
                    <td className="body-cell" key={i}>
                      {el.value}
                    </td>,
                  )}
                </tr>,
              )}
          </tbody>
        </table>
      </TableWrapper>
    );
  }

  private onSortChangeTable(columnKey: string): void {
    if (this.props.onSortChange) {
      const currentSortDir: SortDirs = getColumnSortingDirection(this.props.sortBy, columnKey);
      this.props.onSortChange({
        columnKey,
        sortDir: getNextSortingDirection(currentSortDir),
      });
    }
  }

}
