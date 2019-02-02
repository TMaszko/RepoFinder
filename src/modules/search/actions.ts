import {Action} from "redux";

import {actionCreator, IPayloadAction, payloadActionCreator} from "../actions";
import {ISearchRepoResult} from "./ISearchRepoResult";

export type SearchTypes = IPayloadAction<string> | IPayloadAction<ISearchRepoResult[]>;

export const SEARCH_VALUE_CHANGED: string = "@SEARCH/SEARCH_VALUE_CHANGED";
export const onSearchValueChanged: (value: string) => IPayloadAction<string> = payloadActionCreator<string>(SEARCH_VALUE_CHANGED);

export const FETCHED_SEARCH_RESULT_SUCCESS: string = "@SEARCH/FETCH_SEARCH_RESULT_SUCCESS";
export const onFetchedSearchResultSuccess: (results: ISearchRepoResult[]) => IPayloadAction<ISearchRepoResult[]> =
  payloadActionCreator<ISearchRepoResult[]>(FETCHED_SEARCH_RESULT_SUCCESS);

export const SEARCH_STATE_SAVED: string = "@SEARCH/SEARCH_STATE_SAVED";
export const onSearchStateSaved: () => Action<string> = actionCreator(SEARCH_STATE_SAVED);
