import {AppDispatch} from "../store";
import {authFormsSlice} from "../reducers/formReducer";

export const activateSignIn = () => (dispatch: AppDispatch) => {
    dispatch(authFormsSlice.actions.activateSignInForm())
}
export const activateSignUp = () => (dispatch: AppDispatch) => {
    dispatch(authFormsSlice.actions.activateSignUpForm())
}