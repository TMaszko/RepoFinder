import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {zip} from "../../modules/arrays";
import {ISearchRepoResult} from "../../modules/search/ISearchRepoResult";
import {IMainState} from "../../modules/states";
import {onTableSortingDirChanged} from "../../modules/table/actions";
import {IColumn, IRow, ISortBySettings, Table} from "../table/Table";

interface IStateProps {
  results: ISearchRepoResult[];
  sortBy: ISortBySettings[];
}

interface IDispatchProps {
  onSortChanged: (column: ISortBySettings) => void;
}

interface IProps extends IStateProps, IDispatchProps {
}

const columnKeys: string[] = ["id", "title", "owner", "stars", "createdAt"];

const columnsHeaders: string[] = ["ID", "Repo Title", "Owner", "Stars", "Created at"];

const zippedColumns: IColumn[] = zip<string, string, IColumn>(columnKeys, columnsHeaders, (key, header) => {
  return {
    columnKey: key,
    header,
  };
});

const mapResultsToRows: (results: ISearchRepoResult[]) => IRow[] = (results: ISearchRepoResult[]): IRow[] => {
  return results.map(repo => {
    return {
      id: repo.id,
      data: columnKeys.map(columnKey => {
        return {
          columnKey,
          value: repo[columnKey],
        };
      }),
    };
  });
};

class ResultsTableComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {

    return (
      <Table
        onSortChange={this.props.onSortChanged}
        sortBy={this.props.sortBy}
        columnsHeaders={zippedColumns}
        rows={mapResultsToRows(this.props.results)}
      />
    );
  }
}

export const ResultsTable: React.ComponentClass<{}> = connect<IStateProps, IDispatchProps, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      results: state.search.results,
      sortBy: state.table.sortBy,
    };
  },
  (dispatch: Dispatch): IDispatchProps => {
    return {
      onSortChanged(column: ISortBySettings): void {
        dispatch(onTableSortingDirChanged(column));
      },
    };
  },
)(ResultsTableComponent);