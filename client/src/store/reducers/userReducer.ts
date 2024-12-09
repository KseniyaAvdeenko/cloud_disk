import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserInitialState} from "../../interface/IIntialStates";
import {IUser} from "../../interface/IUser";

const initialState: IUserInitialState = {
    currentUser: null,
    isLoading: false
}
export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchCurrentUser(state){
          state.isLoading = true;
        },
        getCurrentUserSuccess(state, action:PayloadAction<IUser>) {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        getCurrentUserFail(state) {
            state.isLoading = false;
            state.currentUser = null;
        },
        changeCurrentUserSuccess(state, action: PayloadAction<IUser>){
            state.currentUser = action.payload;
        }
    }
})

export default userReducer.reducer;