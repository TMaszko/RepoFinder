import {Reducer} from "redux";

import {IPayloadAction} from "../actions";
import {ISearchState} from "../states";
import {SEARCH_VALUE_CHANGED} from "./actions";

const searchReducer: Reducer<ISearchState, IPayloadAction<string>> = (
  state: ISearchState = { value: "" },
  action: IPayloadAction<string>,
): ISearchState => {
  const { type } = action;

  switch (type) {
    case SEARCH_VALUE_CHANGED: {
      return {
        value: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer: Reducer<ISearchState, IPayloadAction<string>> = searchReducer;
