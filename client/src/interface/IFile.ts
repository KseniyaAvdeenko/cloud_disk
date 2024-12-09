import exp from "constants";

export interface IFileBase{
    name: string;
    type: string;
    accessLink: string,
    size: number,
    path: string,
    date: string,
    userId: string,
    parent: string,
    children: [],
}
export interface IFile extends IFileBase{
    _id: string
}

export interface IUploadedFile{
    id: number;
    fileName: string;
    progress: number;
}

