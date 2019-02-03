import {Action, applyMiddleware, combineReducers, compose, createStore, Store, StoreEnhancer} from "redux";
import {createEpicMiddleware, EpicMiddleware} from "redux-observable";

import {onInitApp} from "./actions";
import rootEpic, {EpicActions} from "./epics";
import {rootReducer as pagination} from "./pagination/reducers";
import {rootReducer as search} from "./search/reducers";
import {IMainState} from "./states";
import {rootReducer as table} from "./table/reducers";
import {rootReducer as user} from "./user/reducers";

export const INITIAL_STATE_KEY: string = "initialState";

const composeEnhancers: <S>(enhancer: StoreEnhancer<S>) => StoreEnhancer<S> = (
  process.env.NODE_ENV !== "production" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const getInitialStateIfPossible: () => IMainState = () => {
  const possibleSerializedInitialState: string = window.localStorage.getItem(INITIAL_STATE_KEY) || "";
  const isInitialState: boolean = !!possibleSerializedInitialState;
  return isInitialState ? JSON.parse(possibleSerializedInitialState) : undefined;
};

const epicMiddleware: EpicMiddleware<EpicActions, EpicActions, IMainState> = createEpicMiddleware();

export default function getConfiguredStore(): Store<IMainState> {
  const initialState: IMainState = getInitialStateIfPossible();
  const store: Store<IMainState> = createStore<IMainState, Action<string>, {}, {}>(
    combineReducers({
      search,
      table,
      pagination,
      user,
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
      ),
    ),
  );

  epicMiddleware.run(rootEpic);

  store.dispatch(onInitApp());

  return store;
}
