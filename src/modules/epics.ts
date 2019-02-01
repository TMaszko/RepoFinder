import {Action} from "redux";
import {combineEpics} from "redux-observable";

import {IPayloadAction} from "./actions";
import {saveEpic, searchEpic} from "./search/epics";
import {ISearchRepoResult} from "./search/ISearchRepoResult";

export type EpicActions = IPayloadAction<string> | IPayloadAction<ISearchRepoResult[]> | Action<string>;

export default combineEpics(
  searchEpic,
  saveEpic,
);
