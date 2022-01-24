import { createStore, combineReducers,applyMiddleware,compose } from "redux";
import thunk from"redux-thunk";

//createStore : 모든 리듀서 + 여러 옵션을 저장하는 곳
//combineReducers : 리듀서를 묶는 함수

import bucket from "./modules/bucket";

//중괄호 안 모든 리듀서를 묶는다.
const rootReducer = combineReducers({bucket});

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer,enhancer);

export default store;
