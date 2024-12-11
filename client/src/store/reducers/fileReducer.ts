import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitial, Sort, View} from "../../interface/IIntialStates";
import {IFile} from "../../interface/IFile";


const initialState: IFilesInitial = {
    files: [],
    file: null,
    currentDir: null,
    isLoading: false,
    dirStack: [],
    sort: localStorage.sort || "type",
    view: localStorage.view || 'list'
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
        changeSortingMethod(state, action: PayloadAction<string>){
            state.sort = action.payload;
            localStorage.setItem('sort', action.payload)
        },
        changeFileView(state, action: PayloadAction<View>){
            state.view = action.payload;
            localStorage.setItem('view', action.payload)
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