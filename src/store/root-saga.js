import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}

/*
    Redux Saga
    1. It is a middleware in redux.
    2. Normal Middleware receives action before reducers. But Saga Middleware receives action after reducers.
    3. it totally based on Generator functions.
        Syntax: function* g(){
            yield()...
        }
    4. Generator Function: This functions resembles async/await but not purely that. This are the new feature which is native to javascript ecosystem. This pauses execution of the function when sees a key called 'yield'
    4. npm i redux-saga
*/
