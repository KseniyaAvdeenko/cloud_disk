import {createSlice} from "@reduxjs/toolkit";
import {IAuthFormsInitial} from "../../interface/IIntialStates";

const initialState: IAuthFormsInitial = {
    activeForm: 'signIn',
    signUpFormDisplay: 'none',
    signInFormDisplay: 'flex'
}

export const authFormsSlice = createSlice({
    name: 'authForms',
    initialState,
    reducers: {
        activateSignInForm(state){
            state.activeForm = 'signIn';
            state.signInFormDisplay = 'flex';
            state.signUpFormDisplay = 'none';
        },
        activateSignUpForm(state){
            state.activeForm = 'signUp';
            state.signInFormDisplay = 'none';
            state.signUpFormDisplay = 'flex';
        },
    }
})

export default authFormsSlice.reducer