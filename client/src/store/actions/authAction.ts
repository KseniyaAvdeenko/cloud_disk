import axios from "axios";
import {ntfReducer} from "../reducers/ntfReducer";
import {authReducer} from "../reducers/authReducer";
import {AppDispatch} from "../store";
import axiosInstance from "../../http";
import {userReducer} from "../reducers/userReducer";
import {IAuthUser} from "../../interface/IUser";

export const signUpUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axios.post(process.env.REACT_APP_API_URL + 'api/auth/sign_up', {email, password})
        dispatch(ntfReducer.actions.setSuccess(resp.data.message))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('sign up error'))
    }
}

export const signInUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.post<{ accessToken: string; refreshToken: string }>( 'api/auth/sign_in', {email, password})
        dispatch(authReducer.actions.signInSuccess(resp.data.accessToken))
        dispatch(ntfReducer.actions.setSuccess('You are signed in successfully'))
    } catch (e) {
        dispatch(authReducer.actions.signInFail())
        dispatch(ntfReducer.actions.setError('sign in error'))
    }
}
export const signOutUser = () => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.post<{ message: string }>( 'api/auth/sign_out')
        dispatch(authReducer.actions.signOutSuccess())
        dispatch(ntfReducer.actions.setSuccess(resp.data.message))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('sign out error'))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IAuthUser>( process.env.REACT_APP_API_URL + 'api/auth/refresh', {withCredentials: true})
        dispatch(authReducer.actions.verifyAccessSuccess(response.data.accessToken));
        dispatch(userReducer.actions.getCurrentUserSuccess(response.data.user))
    } catch (err) {
        dispatch(authReducer.actions.verifyAccessFail())
    }
}