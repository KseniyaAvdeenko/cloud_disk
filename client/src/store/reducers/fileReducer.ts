import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitial} from "../../interface/IIntialStates";
import {IFile} from "../../interface/IFile";


const initialState: IFilesInitial = {
    files: null,
    file: null,
    currentDir: null,
    isLoading: false,
    parentChildren: null
}
export const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        fetchFiles(state) {
            state.isLoading = true;
        },
        loadFilesSuccess(state, action: PayloadAction<IFile[]>) {
            state.isLoading = false;
            state.files = action.payload
        },
        loadFilesFail(state) {
            state.isLoading = false;
        },
        fetchParentFiles(state) {
            state.isLoading = true;
        },
        loadParentFilesSuccess(state, action: PayloadAction<IFile[]>) {
            state.isLoading = false;
            state.parentChildren = action.payload
        },
        loadParentFilesFail(state) {
            state.isLoading = false;
        },
        fetchFile(state) {
            state.isLoading = true;
        },
        loadFileSuccess(state, action: PayloadAction<IFile>) {
            state.file = action.payload;
            state.isLoading = false;
        },
        loadFileFail(state) {
            state.isLoading = false;
        },
        createFileSuccess(state, action: PayloadAction<IFile>) {
            state.file = action.payload
        },
        deleteFileSuccess(state) {
            state.file = null
        }
    }
})

export default fileSlice.reducer;