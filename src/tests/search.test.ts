import {SEARCH_VALUE_CHANGED, SearchTypes} from "../modules/search/actions";
import {rootReducer as searchReducer} from "../modules/search/reducers";
import {ISearchState} from "../modules/states";

describe("serch reducer ", () => {
  const state: ISearchState = { inputValue: "", results: [] };
  it("should return initial state ", () => {
    const action: SearchTypes = {
      type: "",
      payload: "",
    };
    const result: ISearchState = searchReducer(state, action);
    expect(result).toEqual(state);
  });
  it("should handle SEARCH_VALUE_CHANGED ", () => {
    const action: SearchTypes = {
      type: SEARCH_VALUE_CHANGED,
      payload: "title",
    };
    const result: ISearchState = searchReducer(state, action);
    expect(result).toEqual({ ...state, inputValue: "title" });
  });
});
