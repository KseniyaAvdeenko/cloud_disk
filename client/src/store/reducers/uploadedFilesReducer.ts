import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUploadedFilesInitial} from "../../interface/IIntialStates";
import {IUploadedFile} from "../../interface/IFile";

const initialState: IUploadedFilesInitial = {
    isVisible: false,
    files: []
}

export const uploadedFilesReducer = createSlice({
    name: 'uploaded files',
    initialState,
    reducers: {
        showUploader(state) {
            state.isVisible = true;
        },
        hideUploader(state) {
            state.isVisible = false;
        },
        addUploadedFile(state, action: PayloadAction<IUploadedFile>) {
            state.files = [...state.files, action.payload];
        },
        changeUploadedFile(state, action: PayloadAction<IUploadedFile>) {
            state.files = [...state.files.map(file => file.id === action.payload.id
                ? {...file, progress: action.payload.progress}
                : {...file}
            )]
        },
        removeUploadedFiles(state) {
            state.files = [];
        }
    }
})

export default uploadedFilesReducer.reducer;