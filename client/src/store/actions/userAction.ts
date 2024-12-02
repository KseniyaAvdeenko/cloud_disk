import {AppDispatch} from "../store";
import axiosInstance from "../../http";
import {IUser} from "../../interface/IUser";
import {userReducer} from "../reducers/userReducer";

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
    try{
        const resp = await axiosInstance.get<IUser>('/users/me');
        dispatch(userReducer.actions.getCurrentUserSuccess(resp.data))
    }catch (e) {
        dispatch(userReducer.actions.getCurrentUserFail())
    }
}