import * as React from "react";
import {connect} from "react-redux";

import {IMainState} from "../../modules/states";
import {getColumnSortingDirection, getNextSortingDirection} from "../../modules/table/sort";
import {SortDirs} from "../../modules/table/SortDirs";
import {IUser} from "../../modules/user/IUser";
import Arrow from "./Arrow";
import ArrowsWrapper from "./ArrowsWrapper";
import TableWrapper from "./TableWrapper";

export interface ICell {
  columnKey: string;
  value: string | number | boolean | Date;
}

export interface IRow {
  ownerId: string;
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

interface IStateProps {
  user: IUser;
}

interface IOwnProps extends IWithItems<IRow> {
  columnsHeaders: IColumn[];
  sortBy: ISortBySettings[];
  onSortChange?: (column: ISortBySettings) => void;
}

interface IProps extends IOwnProps, IStateProps {
}

class TableComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {

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
              .map(({ data, id, ownerId }) =>
                <tr className={`row${ownerId === this.props.user.uid ? " active-row" : ""}`} key={id}>
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

export const Table: React.ComponentClass<IOwnProps> = connect<IStateProps, {}, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      user: state.user,
    };
  },
)(TableComponent);
