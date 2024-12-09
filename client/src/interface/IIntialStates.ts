import {IUser} from "./IUser";
import {IFile, IUploadedFile} from "./IFile";

export interface IAuthInitialState {
    isAuth: boolean;
    accessToken: string
}

export interface INtfInitialState {
    error: string;
    success: string
}

export interface IUserInitialState {
    isLoading: boolean;
    currentUser: IUser | null
}

export interface IAuthForm {
    activeForm: 'signIn' | 'signUp';
    signInFormDisplay: string;
    signUpFormDisplay: string;
}

export interface IFilesInitial {
    files: IFile[] | [];
    currentDir: string|null
    dirStack: string[]
    file: IFile | null
    isLoading: boolean;
}

export interface IUploadedFilesInitial{
    isVisible: boolean;
    files: IUploadedFile[]|[];
}