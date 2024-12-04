import {AppDispatch} from "../store";
import {fileSlice} from "../reducers/fileReducer";
import axiosInstance from "../../http";
import {IFile} from "../../interface/IFile";
import {ntfReducer} from "../reducers/ntfReducer";

export const getUserFiles = (dirId: string|null) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fileSlice.actions.fetchFiles())
        const resp = await axiosInstance.get<IFile[]>(`/files${dirId ? '?parent=' + dirId : ''}`);
        dispatch(fileSlice.actions.loadFilesSuccess(resp.data))
    } catch (e) {
        dispatch(ntfReducer.actions.setError('loading files fail'))
    }
}