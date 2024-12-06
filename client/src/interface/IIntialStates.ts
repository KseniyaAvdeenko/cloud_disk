import {IUser} from "./IUser";
import {IFile} from "./IFile";

export interface IAuthInitialState {
    isAuth: boolean;
    accessToken: string
}

export interface INtfInitialState {
    error: string;
    success: string
}

export interface IUserInitialState {
    currentUser: IUser | null
}

export interface IAuthForm {
    activeForm: 'signIn' | 'signUp';
    signInFormDisplay: 'flex' | 'none'
    signUpFormDisplay: 'flex' | 'none'
}

export interface IFilesInitial {
    files: IFile[] | [];
    currentDir: string|null
    dirStack: string[]
    file: IFile | null
    isLoading: boolean;
}