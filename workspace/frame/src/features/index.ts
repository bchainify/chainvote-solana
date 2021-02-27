import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'

const rootReducer = combineReducers({})

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export default store
export const history = createBrowserHistory();