import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer, { rootSaga } from "./index";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// Redux-Persist
import { persistStore } from "redux-persist";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };