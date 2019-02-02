import {Action} from "redux";
import {ActionsObservable, combineEpics, ofType, StateObservable} from "redux-observable";
import {Observable} from "rxjs";
import {map, tap, withLatestFrom} from "rxjs/operators";

import {IPayloadAction} from "./actions";
import {FETCHED_SEARCH_RESULT_SUCCESS, onSearchStateSaved} from "./search/actions";
import {searchEpic} from "./search/epics";
import {ISearchRepoResult} from "./search/ISearchRepoResult";
import {IMainState} from "./states";
import {INITIAL_STATE_KEY} from "./store";
import {TABLE_SORTING_DIR_CHANGED} from "./table/actions";

export type EpicActions = IPayloadAction<string> | IPayloadAction<ISearchRepoResult[]> | Action<string>;

export const saveEpic: (actions$: ActionsObservable<EpicActions>, state$: StateObservable<IMainState>) => Observable<EpicActions> =
  (action$, state$) =>
    action$.pipe(
      ofType<EpicActions, IPayloadAction<ISearchRepoResult[]>>(FETCHED_SEARCH_RESULT_SUCCESS, TABLE_SORTING_DIR_CHANGED),
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
