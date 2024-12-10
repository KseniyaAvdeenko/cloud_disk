import React, {Fragment, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createFile, getUserFiles, returnToPrevDir, uploadFile} from "../../../store/actions/fileAction";
import FileList from "./FileList.component";
import styles from './Disk.module.sass'
import CreateDir from "./CreateDir.component";
import UploadFileForm from "./UploadFiles/UploadFileForm.component";
import {hideUploadedFiles, removeUploadedFiles} from "../../../store/actions/uploadedFilesAction";
import NavPanel from "./NavPanel.component";
import Loader from "../../../UI/Loader/Loader";


const Disk = () => {
    const {currentDir, files, dirStack, isLoading, sort} = useAppSelector(state => state.fileReducer)
    const dispatch = useAppDispatch()

    const [isNewDirPopup, setIsNewDirPopup] = useState<boolean>(false)
    const [isNewFilePopup, setIsNewFilePopup] = useState<boolean>(false)
    const [newDirName, setNewDirname] = useState<string>('')
    const [backBtn, setBackBtn] = useState<boolean>(true)
    const [dragEnter, setDragEnter] = useState<boolean>(false)

    const createDirPopupClose = () => setIsNewDirPopup(false);
    const uploadFilePopupClose = () => setIsNewFilePopup(false);

    function createNewDir(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        dispatch(createFile(currentDir, newDirName))
        setNewDirname('')
        createDirPopupClose()
    }

    useEffect(() => {
        dispatch(getUserFiles(currentDir, sort))
        if (!currentDir) setBackBtn(false)
    }, [currentDir, sort])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setNewDirname(e.target.value)

    const backClickHolder = () => {
        if (dirStack.length >= 1) {
            const backDirId = dirStack.length - 2
            dispatch(returnToPrevDir(dirStack[backDirId]))
        } else {
            dispatch(returnToPrevDir(null))
            setBackBtn(false)
        }
    }

    const onUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files: File[] = []
        if (e.target.files) files = Array.from(e.target.files)
        files.forEach(file => dispatch(uploadFile(currentDir, file)))
    }

    const closeUploadFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        uploadFilePopupClose()
        dispatch(hideUploadedFiles())
        dispatch(removeUploadedFiles())
    }

    const dragEnterHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true)
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false)
    }

    const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true)
    }

    const dropHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        let files: File[];
        if (e.dataTransfer.files) {
            files = Array.from(e.dataTransfer.files)
            files.forEach(file => dispatch(uploadFile(currentDir, file)))
        }
        setDragEnter(false)
    }

    if(isLoading) return (<Loader/>)

    return (
        <Fragment>
            <CreateDir
                createDirPopupClose={createDirPopupClose}
                newDirName={newDirName}
                onChangeHandler={onChangeHandler}
                createNewDir={createNewDir}
                isNewDirPopup={isNewDirPopup}
            />
            <UploadFileForm
                dragEnter={dragEnter}
                dragEnterHandler={dragEnterHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragOverHandler={dragOverHandler}
                dropHandler={dropHandler}
                isNewFilePopup={isNewFilePopup}
                onUploadHandler={onUploadHandler}
                uploadFilePopupClose={uploadFilePopupClose}
                closeUploadFiles={closeUploadFiles}
            />
            <main className={styles.main}>
                <NavPanel
                    backBtn={backBtn}
                    backClickHolder={backClickHolder}
                    setIsNewDirPopup={setIsNewDirPopup}
                    setIsNewFilePopup={setIsNewFilePopup}
                />
                <FileList files={files} setBackBtn={setBackBtn}/>
            </main>
        </Fragment>
    );
};

export default Disk;
