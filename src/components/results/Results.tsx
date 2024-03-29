import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {zip} from "../../modules/arrays";
import {ISearchRepoResult} from "../../modules/search/ISearchRepoResult";
import {IMainState} from "../../modules/states";
import {onTableSortingDirChanged} from "../../modules/table/actions";
import {sortByMultiplePropsComparator} from "../../modules/table/sort";
import {PerPageChanger} from "../pagination/PerPageChanger";
import {IInjectedProps, withPagination} from "../pagination/withPagination";
import {IColumn, IRow, ISortBySettings, Table} from "../table/Table";
import ResultsWrapper from "./ResultsWrapper";

interface IStateProps extends IInjectedProps<IRow> {
  sortBy: ISortBySettings[];
}

interface IDispatchProps {
  onSortChanged: (column: ISortBySettings) => void;
}

interface IProps extends IStateProps, IDispatchProps {
}

const columnKeys: (keyof ISearchRepoResult)[] = ["id", "title", "owner", "stars", "createdAt"];

const columnsHeaders: string[] = ["ID", "Repo Title", "Owner", "Stars", "Created at"];

const zippedColumns: IColumn[] = zip<keyof ISearchRepoResult, string, IColumn>(columnKeys, columnsHeaders, (key, header) => {
  return {
    columnKey: key,
    header,
  };
});

const mapResultsToRows: (results: ISearchRepoResult[]) => IRow[] = (results: ISearchRepoResult[]): IRow[] => {
  return results.map(repo => {
    return {
      ownerId: repo.ownerId,
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

const perPageChangerOptions: number[] = [5, 10, 15, 20];

class ResultsComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {

    return (
      <ResultsWrapper>
        <PerPageChanger options={perPageChangerOptions} />
        <Table
          onSortChange={this.props.onSortChanged}
          sortBy={this.props.sortBy}
          columnsHeaders={zippedColumns}
          items={this.props.items}
        />
      </ResultsWrapper>
    );
  }
}

export const Results: React.ComponentClass<{}> = connect<IStateProps, IDispatchProps, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      items: [...mapResultsToRows(state.search.results)].sort(sortByMultiplePropsComparator(state.table.sortBy)),
      sortBy: state.table.sortBy,
      perPage: state.pagination.perPage,
      visiblePages: 5,
    };
  },
  (dispatch: Dispatch): IDispatchProps => {
    return {
      onSortChanged(column: ISortBySettings): void {
        dispatch(onTableSortingDirChanged(column));
      },
    };
  },
)(withPagination<IRow, IProps>(ResultsComponent));
