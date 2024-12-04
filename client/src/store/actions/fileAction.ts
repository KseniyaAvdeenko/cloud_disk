import {AppDispatch} from "../store";
import {fileReducer} from "../reducers/fileReducer";
import axiosInstance from "../../http";
import {IFile} from "../../interface/IFile";
import {ntfReducer} from "../reducers/ntfReducer";

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