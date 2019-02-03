import {Action} from "redux";
import {ActionsObservable, combineEpics, ofType, StateObservable} from "redux-observable";
import {Observable} from "rxjs";
import {map, tap, withLatestFrom} from "rxjs/operators";

import {
  PAGINATION_CHANGE_PAGE,
  PAGINATION_CHANGE_PER_PAGE,
  PAGINATION_NEXT_PAGE,
  PAGINATION_PREV_PAGE,
  PaginationTypes,
} from "./pagination/actions";
import {FETCHED_SEARCH_RESULT_SUCCESS, onSearchStateSaved, SearchTypes} from "./search/actions";
import {searchEpic} from "./search/epics";
import {IMainState} from "./states";
import {INITIAL_STATE_KEY} from "./store";
import {TABLE_SORTING_DIR_CHANGED, TableTypes} from "./table/actions";

export type EpicActions = SearchTypes | PaginationTypes | TableTypes | Action<string>;

export const saveEpic: (actions$: ActionsObservable<EpicActions>, state$: StateObservable<IMainState>) => Observable<EpicActions> =
  (action$, state$) =>
    action$.pipe(
      ofType<EpicActions>(
        FETCHED_SEARCH_RESULT_SUCCESS,
        TABLE_SORTING_DIR_CHANGED,
        PAGINATION_PREV_PAGE,
        PAGINATION_NEXT_PAGE,
        PAGINATION_CHANGE_PAGE,
        PAGINATION_CHANGE_PER_PAGE,
      ),
      withLatestFrom(state$, (_, state) => state),
      tap(state => {
        const serializedState: string = JSON.stringify(state);
        window.localStorage.setItem(INITIAL_STATE_KEY, serializedState);
      }),
      map(onSearchStateSaved),
    );

export default combineEpics(
  searchEpic,
  saveEpic,
);
