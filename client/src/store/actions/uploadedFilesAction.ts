import {AppDispatch} from "../store";
import {uploadedFilesReducer} from "../reducers/uploadedFilesReducer";
import {IUploadedFile} from "../../interface/IFile";

export const hideUploadedFiles = () => async (dispatch: AppDispatch) => dispatch(uploadedFilesReducer.actions.hideUploader());

export const showUploadedFiles = () => async (dispatch: AppDispatch) => dispatch(uploadedFilesReducer.actions.showUploader());

export const addUploadedFile = (file: IUploadedFile) => async (dispatch: AppDispatch) => dispatch(uploadedFilesReducer.actions.addUploadedFile(file));

export const removeUploadedFiles = () => async (dispatch: AppDispatch) => dispatch(uploadedFilesReducer.actions.removeUploadedFiles());

export const changeUploadedFile = (file: IUploadedFile) => async (dispatch: AppDispatch) => dispatch(uploadedFilesReducer.actions.changeUploadedFile(file));