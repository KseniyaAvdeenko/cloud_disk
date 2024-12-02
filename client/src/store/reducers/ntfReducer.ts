import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INtfInitialState} from "../../interface/IIntialStates";

const initialState: INtfInitialState = {
    error: '',
    success: ''
}

export const ntfReducer = createSlice({
    name: 'ntf',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setSuccess(state, action: PayloadAction<string>) {
            state.success = action.payload;
        },
        removeError(state) {
            state.error = '';
        },
        removeSuccess(state) {
            state.success = '';
        },
    }
})

export default ntfReducer.reducer;