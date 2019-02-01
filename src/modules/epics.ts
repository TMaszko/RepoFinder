import {combineEpics} from "redux-observable";

import {IPayloadAction} from "./actions";
import {searchEpic} from "./search/epics";
import {ISearchRepoResult} from "./search/ISearchRepoResult";

export type EpicActions = IPayloadAction<string> | IPayloadAction<ISearchRepoResult[]>;

export default combineEpics(
  searchEpic,
);
