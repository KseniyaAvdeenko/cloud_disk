import {AppDispatch} from "../store";
import {fileReducer} from "../reducers/fileReducer";
import axiosInstance from "../../http";
import {IFile} from "../../interface/IFile";
import {ntfReducer} from "../reducers/ntfReducer";
import {AxiosProgressEvent} from "axios";

export const getUserFiles = (dirId: string | null) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fileReducer.actions.fetchFiles())
        const resp = await axiosInstance.get<IFile[]>(`/files${dirId ? '?parent=' + dirId : ''}`);
        dispatch(fileReducer.actions.loadFilesSuccess(resp.data))
    } catch (e) {
        dispatch(fileReducer.actions.loadFilesFail())
        dispatch(ntfReducer.actions.setError('loading files fail'))
    }
}

export const createFile = (dirId: string | null, name: string) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.post<IFile>(`/files`, {name, parent: dirId, type: "dir"});
        dispatch(fileReducer.actions.createFileSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('file created successfully'))
        dispatch(getUserFiles(dirId))
    } catch (e) {
        console.log(e)
        dispatch(ntfReducer.actions.setError('create file fail'))
    }
}

export const setDirectoryName = (dirName: string | null) => async (dispatch: AppDispatch) => {
    dirName
        ? dispatch(fileReducer.actions.setDirName(dirName))
        : dispatch(fileReducer.actions.setDirName(null))
}

export const returnToPrevDir = (dirName: string | null) => async (dispatch: AppDispatch) => {
    dirName
        ? dispatch(fileReducer.actions.goBack(dirName))
        : dispatch(fileReducer.actions.goBack(null))
}

export const uploadFile = (dirId: string | null, file: any) => async (dispatch: AppDispatch) => {
    try {
        const formData = new FormData();
        formData.append('file', file)
        if(dirId) formData.append('parent', dirId)
        const resp = await axiosInstance.post<IFile>(
            `/files/upload`,
            formData,
            {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload progress: ${progress}%`);
                    }
                }
            }
            );
        dispatch(fileReducer.actions.createFileSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('file created successfully'))
        dispatch(getUserFiles(dirId))
    } catch (e) {
        console.log(e)
        dispatch(ntfReducer.actions.setError('create file fail'))
    }
}