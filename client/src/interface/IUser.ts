export interface IUserBase {
    email: string,
    password: string,
    diskSpace: number,
    usedSpace: number,
    avatar?: string,
    files?: []
}

export interface IUser extends IUserBase{
    _id: string
}