import {Action, Reducer} from "redux";

import {IPayloadAction} from "../actions";
import {ISearchState} from "../states";
import {FETCHED_SEARCH_RESULT_SUCCESS, SEARCH_VALUE_CHANGED} from "./actions";
import {ISearchRepoResult} from "./ISearchRepoResult";

const searchReducer: Reducer<ISearchState, Action> = (
  state: ISearchState = { inputValue: "", results: [] },
  action: Action,
): ISearchState => {
  const { type } = action;
  const payload: any = (action as IPayloadAction<any>).payload;

  switch (type) {
    case SEARCH_VALUE_CHANGED: {
      return {
        ...state,
        inputValue: payload as string,
      };
    }

    case FETCHED_SEARCH_RESULT_SUCCESS: {
      return {
        ...state,
        results: payload as ISearchRepoResult[],
      };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer: Reducer<ISearchState, Action> = searchReducer;
