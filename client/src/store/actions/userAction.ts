import {AppDispatch} from "../store";
import axiosInstance from "../../http";
import {IAuthUser, IUser} from "../../interface/IUser";
import {userReducer} from "../reducers/userReducer";
import {ntfReducer} from "../reducers/ntfReducer";
import {authReducer} from "../reducers/authReducer";

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userReducer.actions.fetchCurrentUser())
        const resp = await axiosInstance.get<IUser>('api/users/me');
        dispatch(userReducer.actions.getCurrentUserSuccess(resp.data))
    } catch (e) {
        dispatch(userReducer.actions.getCurrentUserFail())
    }
}

export const updateCurrentUserAvatar = (file: File) => async (dispatch: AppDispatch) => {
    try {
        const formData = new FormData();
        formData.set('file', file)
        const resp = await axiosInstance.patch<IUser>('api/users/me/avatar', formData);
        dispatch(userReducer.actions.changeCurrentUserSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('Update user success'))
        dispatch(getCurrentUser())
    } catch (e) {
        dispatch(ntfReducer.actions.setError('Update user fail'))
    }
}

export const deleteCurrentUserAvatar = () => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.delete<IUser>('api/users/me/avatar');
        dispatch(userReducer.actions.changeCurrentUserSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('Update user success'))
        dispatch(getCurrentUser())
    } catch (e) {
        dispatch(ntfReducer.actions.setError('Update user fail'))
    }
}

export const changeCurrentUser = (data: any) => async (dispatch: AppDispatch) => {
    try {
        let url: string = 'api/users/me/'
        if (data.email) url = 'api/users/me/email'
        if (data.password) url = 'api/users/me/password'
        dispatch(userReducer.actions.fetchCurrentUser())
        const resp = await axiosInstance.patch<IAuthUser>(url, data);
        dispatch(userReducer.actions.changeCurrentUserSuccess(resp.data.user));
        dispatch(authReducer.actions.signInSuccess(resp.data.accessToken))
        dispatch(ntfReducer.actions.setSuccess('Update user success'))
        dispatch(getCurrentUser())
    } catch (e) {
        dispatch(ntfReducer.actions.setError('Update user fail'))
    }
}