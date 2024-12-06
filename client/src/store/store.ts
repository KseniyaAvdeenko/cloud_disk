import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import fileReducer from './reducers/fileReducer';
import ntfReducer from './reducers/ntfReducer';

export const rootReducer = combineReducers({
    authReducer,
    userReducer,
    fileReducer,
    ntfReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];