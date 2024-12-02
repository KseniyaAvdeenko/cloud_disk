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