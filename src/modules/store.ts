import {applyMiddleware, combineReducers, compose, createStore, Store, StoreEnhancer} from "redux";
import {createEpicMiddleware, EpicMiddleware} from "redux-observable";

import {IAction} from "./actions";
import rootEpic from "./epics";
import {IMainState} from "./states";

const composeEnhancers: <S>(enhancer: StoreEnhancer<S>) => StoreEnhancer<S> = (
  process.env.NODE_ENV !== "production" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const epicMiddleware: EpicMiddleware<IAction> = createEpicMiddleware();

export default function getConfiguredStore(): Store<IMainState> {
  const store: Store<IMainState> = createStore<IMainState, IAction, {}, {}>(
    combineReducers({

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
