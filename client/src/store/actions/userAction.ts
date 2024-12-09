import {AppDispatch} from "../store";
import axiosInstance from "../../http";
import {IUser} from "../../interface/IUser";
import {userReducer} from "../reducers/userReducer";
import {ntfReducer} from "../reducers/ntfReducer";

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userReducer.actions.fetchCurrentUser())
        const resp = await axiosInstance.get<IUser>('/users/me');
        dispatch(userReducer.actions.getCurrentUserSuccess(resp.data))
    } catch (e) {
        dispatch(userReducer.actions.getCurrentUserFail())
    }
}

export const updateCurrentUser = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const formData = new FormData();
        formData.set('avatar', data)
        const resp = await axiosInstance.patch<IUser>('/users/me/avatar', formData);
        dispatch(userReducer.actions.changeCurrentUserSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('Update user success'))
        dispatch(getCurrentUser())
    } catch (e) {
        dispatch(ntfReducer.actions.setError('Update user fail'))
    }
}