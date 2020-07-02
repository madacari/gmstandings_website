import { createStore, applyMiddleware } from 'redux'
import {  gmstandingsReducer } from "./reducers";
import createSagaMiddleware from 'redux-saga';

import gmstandingsSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

// const rootReducer = combineReducers({
    // tableselectionReducer,
    // matchselectionReducer
// })

export const store = createStore(
        gmstandingsReducer,
        applyMiddleware(sagaMiddleware)
    )

sagaMiddleware.run(gmstandingsSaga);

// export type RootState = ReturnType<typeof gmstandingsReducer>
