import { createStore } from 'redux'
import {  gmstandingsReducer } from "./reducers";

// const rootReducer = combineReducers({
    // tableselectionReducer,
    // matchselectionReducer
// })

export const store = createStore(gmstandingsReducer)

// export type RootState = ReturnType<typeof gmstandingsReducer>
