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

export interface IAuthFormsInitial {
    activeForm: 'signIn' | 'signUp';
    signInFormDisplay: 'flex' | 'none'
    signUpFormDisplay: 'flex' | 'none'
}

export interface IFilesInitial {
    files: IFile[] | [] | null;
    currentDir: string|null
    parentChildren: IFile[] | [] | null
    file: IFile | null
    isLoading: boolean;
}