import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitial} from "../../interface/IIntialStates";
import {IFile} from "../../interface/IFile";


const initialState: IFilesInitial = {
    files: [],
    file: null,
    currentDir: null,
    isLoading: false,
    dirStack: []
}
export const fileReducer = createSlice({
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
        setDirName(state, action: PayloadAction<string|null>) {
            if(action.payload){
                state.currentDir = action.payload;
                state.dirStack.push(action.payload)
            }else{
                state.currentDir = null;
                state.dirStack = [];
            }
        },
        goBack(state, action: PayloadAction<string|null>){
            if(action.payload){
                state.currentDir = action.payload;
                state.dirStack.pop()
            }else{
                state.currentDir = null;
                state.dirStack = [];
            }
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
            state.file = action.payload;
        },
        deleteFileSuccess(state) {
            state.file = null
        }
    }
})

export default fileReducer.reducer;