import {AppDispatch} from "../store";
import {fileReducer} from "../reducers/fileReducer";
import axiosInstance from "../../http";
import {IFile, IUploadedFile} from "../../interface/IFile";
import {ntfReducer} from "../reducers/ntfReducer";
import {AxiosProgressEvent} from "axios";
import {addUploadedFile, changeUploadedFile, showUploadedFiles} from "./uploadedFilesAction";
import {View} from "../../interface/IIntialStates";


export const getUserFiles = (dirId: string | null, sort: string) => async (dispatch: AppDispatch) => {
    try {
        let url = `api/files`
        if(dirId) url = `api/files?parent=${dirId}`;
        if(sort) url = `api/files?sort=${sort}`;
        if(dirId && sort) url = `api/files?parent=${dirId}&sort=${sort}`;
        dispatch(fileReducer.actions.fetchFiles())
        const resp = await axiosInstance.get<IFile[]>(url);
        dispatch(fileReducer.actions.loadFilesSuccess(resp.data))
    } catch (e) {
        dispatch(fileReducer.actions.loadFilesFail())
        dispatch(ntfReducer.actions.setError('loading files fail'))
    }
}

export const createFile = (dirId: string | null, name: string) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.post<IFile>(`api/files`, {name, parent: dirId, type: "dir"});
        dispatch(fileReducer.actions.createFileSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('file created successfully'))
        dispatch(getUserFiles(dirId, localStorage.sort || 'type'))
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

export const uploadFile = (dirId: string | null, file: File) => async (dispatch: AppDispatch) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        if (dirId) formData.append('parent', dirId);
        let uploadedFile = {fileName: file['name'], progress: 0, id: Date.now()};
        dispatch(showUploadedFiles());
        dispatch(addUploadedFile(uploadedFile));
        const upFile = structuredClone(uploadedFile)
        const resp = await axiosInstance.post<IFile>(
            `api/files/upload`,
            formData,
            {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        upFile.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        dispatch(changeUploadedFile(upFile))
                    }
                }
            });
        dispatch(fileReducer.actions.createFileSuccess(resp.data))
        dispatch(ntfReducer.actions.setSuccess('file created successfully'))
        dispatch(getUserFiles(dirId, localStorage.sort || 'type'))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('create file fail'))
    }
}

export const downLoadFile = (file: IFile) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.get(`api/files/download?id=${file._id}`, {responseType: 'blob'})
        if (resp.status === 200) {
            const downloadUrl = URL.createObjectURL(resp.data);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.append(link)
            link.click();
            link.remove()
        }
    } catch (e) {
        dispatch(ntfReducer.actions.setError('create file fail'))
    }
}

export const deleteFile = (fileId: string, dirId: string | null) => async (dispatch: AppDispatch) => {
    try {
        const resp = await axiosInstance.delete<{ message: string }>(`api/files/?id=${fileId}`);
        dispatch(fileReducer.actions.deleteFileSuccess())
        resp.data.message
            ? dispatch(ntfReducer.actions.setSuccess(resp.data.message))
            : dispatch(ntfReducer.actions.setSuccess('File deleted successfully'))
        dispatch(getUserFiles(dirId, localStorage.sort || 'type'))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('delete file fail'))
    }
}

export const changeSorting = (sort: string) => async (dispatch: AppDispatch) => dispatch(fileReducer.actions.changeSortingMethod(sort))

export const searchFiles = (search: string) => async (dispatch: AppDispatch) => {
    try {
        let url = `api/files/search?search=${search}`;
        dispatch(fileReducer.actions.fetchFiles())
        const resp = await axiosInstance.get<IFile[]>(url);
        dispatch(fileReducer.actions.loadFilesSuccess(resp.data))
    } catch (e) {
        dispatch(fileReducer.actions.loadFilesFail())
        dispatch(ntfReducer.actions.setError('loading files fail'))
    }
}

export const changeFileView = (view: View) => async (dispatch: AppDispatch) => dispatch(fileReducer.actions.changeFileView(view))