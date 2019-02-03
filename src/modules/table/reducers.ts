import {Reducer} from "redux";

import {ISortBySettings} from "../../components/table/Table";
import {IPayloadAction} from "../actions";
import {ITableState} from "../states";
import {TABLE_SORTING_DIR_CHANGED} from "./actions";

const calcNewSortingSettings: (column: ISortBySettings, sortBySettings: ISortBySettings[]) => ISortBySettings[] =
  (column, sortBySettings) => [...sortBySettings.filter(el => el.columnKey !== column.columnKey), column];

export type TableTypes = IPayloadAction<ISortBySettings>;

const tableReducer: Reducer<ITableState, TableTypes> = (
  state: ITableState = { sortBy: [] },
  action: TableTypes,
) => {
  const { type, payload } = action;

  switch (type) {
    case TABLE_SORTING_DIR_CHANGED: {
      return {
        ...state,
        sortBy: calcNewSortingSettings(payload as ISortBySettings, state.sortBy),
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer: Reducer<ITableState, TableTypes> = tableReducer;
