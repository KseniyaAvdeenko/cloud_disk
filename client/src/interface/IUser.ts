export interface IUserBase {
    email: string,
    diskSpace: number,
    usedSpace: number,
    avatar?: string,
    files?: []
}

export interface IUser extends IUserBase {
    _id: string
}

export interface IAuthUser {
    accessToken: string;
    refreshToken: string;
    user: IUser
}