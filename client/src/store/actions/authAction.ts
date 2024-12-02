import axios from "axios";
import {ntfReducer} from "../reducers/ntfReducer";
import {authReducer} from "../reducers/authReducer";
import {AppDispatch} from "../store";
import axiosInstance from "../../http";

export const signUpUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axios.post(process.env.API_URL + '/auth/sign_up', JSON.stringify({email, password}))
        dispatch(ntfReducer.actions.setSuccess(resp.data.message))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('sign up error'))
    }
}

export const signInUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.post<{ accessToken: string; refreshToken: string }>(process.env.API_URL + '/auth/sign_in', JSON.stringify({
            email,
            password
        }))
        dispatch(authReducer.actions.signInSuccess(resp.data.accessToken))
        dispatch(ntfReducer.actions.setSuccess('You are signed in successfully'))
    } catch (e) {
        dispatch(authReducer.actions.signInFail())
        dispatch(ntfReducer.actions.setError('sign in error'))
    }
}
export const signOutUser = () => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.post<{ message: string }>(process.env.API_URL + '/auth/sign_in')
        dispatch(authReducer.actions.signOutSuccess())
        dispatch(ntfReducer.actions.setSuccess(resp.data.message))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('sign out error'))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get<{ accessToken: string; refreshToken: string }>(process.env.API_URL + '/auth/refresh', {withCredentials: true})
        console.log(response)
        dispatch(authReducer.actions.verifyAccessSuccess(response.data.accessToken));
    } catch (err) {
        dispatch(authReducer.actions.verifyAccessFail())
        console.log(err)
    }
}