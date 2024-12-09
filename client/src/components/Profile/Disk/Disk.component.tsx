import React, {Fragment, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createFile, getUserFiles, returnToPrevDir, uploadFile} from "../../../store/actions/fileAction";
import FileList from "./FileList.component";
import styles from './Disk.module.sass'
import CreateDir from "./CreateDir.component";
import UploadFile from "./UploadFile.component";


const Disk = () => {
    const {currentDir, files, dirStack, isLoading} = useAppSelector(state => state.fileReducer)
    const dispatch = useAppDispatch()

    const [isNewDirPopup, setIsNewDirPopup] = useState<boolean>(false)
    const [isNewFilePopup, setIsNewFilePopup] = useState<boolean>(false)
    const [newDirName, setNewDirname] = useState<string>('')
    const [backBtn, setBackBtn] = useState<boolean>(true)
    const [newFiles, setNewFiles] = useState<File[]>([])
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
        dispatch(getUserFiles(currentDir))
        if (!currentDir) setBackBtn(false)
    }, [currentDir])

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
        setNewFiles(files)
        files.forEach(file => dispatch(uploadFile(currentDir, file)))
    }

    const uploadFilesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        uploadFilePopupClose()
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
            setNewFiles(files)
            files.forEach(file => dispatch(uploadFile(currentDir, file)))
        }
        setDragEnter(false)
    }

    return (
        <Fragment>
            <CreateDir
                createDirPopupClose={createDirPopupClose}
                newDirName={newDirName}
                onChangeHandler={onChangeHandler}
                createNewDir={createNewDir}
                isNewDirPopup={isNewDirPopup}
            />
            <UploadFile
                dragEnter={dragEnter}
                dragEnterHandler={dragEnterHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragOverHandler={dragOverHandler}
                dropHandler={dropHandler}
                newFiles={newFiles}
                isNewFilePopup={isNewFilePopup}
                onUploadHandler={onUploadHandler}
                uploadFilePopupClose={uploadFilePopupClose}
                uploadFilesSubmit={uploadFilesSubmit}
            />
            <main className={styles.main}>
                <div className={styles.main__buttons}>
                    <button style={{visibility: backBtn ? 'visible' : 'hidden'}}
                            onClick={backClickHolder}
                            className={styles.main__buttons__button}>
                        Back
                    </button>
                    <button
                        onClick={() => setIsNewDirPopup(true)}
                        className={styles.main__buttons__button}>
                        Create folder
                    </button>
                    <button
                        onClick={() => setIsNewFilePopup(true)}
                        className={styles.main__buttons__button}>
                        Upload file
                    </button>
                </div>
                {isLoading && 'Loading ...'}
                <FileList files={files} setBackBtn={setBackBtn}/>
            </main>
        </Fragment>
    );
};

export default Disk;
