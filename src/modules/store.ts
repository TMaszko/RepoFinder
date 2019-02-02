import {Action, applyMiddleware, combineReducers, compose, createStore, Store, StoreEnhancer} from "redux";
import {createEpicMiddleware, EpicMiddleware} from "redux-observable";

import {onInitApp} from "./actions";
import rootEpic, {EpicActions} from "./epics";
import {rootReducer as search} from "./search/reducers";
import {IMainState} from "./states";
import {rootReducer as table} from "./table/reducers";

const composeEnhancers: <S>(enhancer: StoreEnhancer<S>) => StoreEnhancer<S> = (
  process.env.NODE_ENV !== "production" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const getInitialStateIfPossible: () => IMainState = () => {
  const possibleSerializedInitialState: string = window.localStorage.getItem("initialState") || "";
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
