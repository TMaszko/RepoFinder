import {Action, applyMiddleware, combineReducers, compose, createStore, Store, StoreEnhancer} from "redux";
import {createEpicMiddleware, EpicMiddleware} from "redux-observable";

import rootEpic, {EpicActions} from "./epics";
import {rootReducer as search} from "./search/reducers";
import {IMainState} from "./states";

const composeEnhancers: <S>(enhancer: StoreEnhancer<S>) => StoreEnhancer<S> = (
  process.env.NODE_ENV !== "production" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const epicMiddleware: EpicMiddleware<EpicActions, EpicActions, IMainState> = createEpicMiddleware();

export default function getConfiguredStore(): Store<IMainState> {
  const store: Store<IMainState> = createStore<IMainState, Action<string>, {}, {}>(
    combineReducers({
      search,
    }),
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
      ),
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
