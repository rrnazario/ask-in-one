import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { LogMiddleware } from './middlewares/log.middleware';
import { AuthSlice } from './slices/auth.slice';
import { NavigationSlice } from './slices/navigation.slice';

export interface AuthAction {
    type: string,
    payload?: {
        token: string
    }
}

export type RootType = {
    token: string
}

const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    navigate: NavigationSlice.reducer
})

export const store = configureStore({ 
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(LogMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch