import {IUser} from "./IUser";

export interface IAuthInitialState{
    isAuth: boolean;
    accessToken: string
}

export interface INtfInitialState{
    error: string;
    success: string
}
export interface IUserInitialState{
    currentUser: IUser | null
}

export interface IAuthFormsInitial{
    activeForm: 'signIn' | 'signUp';
    signInFormDisplay: 'flex'|'none'
    signUpFormDisplay: 'flex'|'none'
}