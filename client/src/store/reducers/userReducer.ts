import {createSlice} from "@reduxjs/toolkit";
import {IUserInitialState} from "../../interface/IIntialStates";

const initialState: IUserInitialState = {
    currentUser: null
}
export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentUserSuccess(state, action) {
            state.currentUser = action.payload;
        },
        getCurrentUserFail(state) {
            state.currentUser = null;
        },
    }
})

export default userReducer.reducer;