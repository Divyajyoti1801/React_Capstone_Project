//Combined place where all state will be living

import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//Local storage feature in order to commit state.
import { persistReducer, persistStore } from "redux-persist";
//We need root reducer
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk"; //Redux-Thunk : allow action to be passed as function and then dispatches them.
// import loggerMiddleware from "./middleware/logger";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const sagaMiddleware=createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlerWares = [
  process.env.NODE_ENV !== "production" && logger,sagaMiddleware,
].filter(Boolean); //Action when got hit here before reducer

//Redux Dev tool setup

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlerWares)); //It enhances our store.

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
