import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthInitialState} from "../../interface/IIntialStates";


const initialState: IAuthInitialState = {
    isAuth: false,
    accessToken: localStorage.access || ''
}

export const authReducer = createSlice({
    name: 'auth slice',
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            localStorage.setItem('access', action.payload);
        },
        signInFail(state) {
            state.accessToken = '';
            localStorage.removeItem('access');
        },
        signOutSuccess(state) {
            state.isAuth = false;
            state.accessToken = '';
            localStorage.removeItem('access');
        },
        verifyAccessSuccess(state, action: PayloadAction<string>){
            state.isAuth = true;
            localStorage.setItem('access', action.payload);
        },
        verifyAccessFail(state){
            state.isAuth = false
            localStorage.removeItem('access');
        },
    }
})

export default authReducer.reducer;