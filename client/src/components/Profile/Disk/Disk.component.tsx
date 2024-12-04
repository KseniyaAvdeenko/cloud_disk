import React, {FC, Fragment, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createFile, getUserFiles, returnToPrevDir, setDirectoryName} from "../../../store/actions/fileAction";
import FileList from "./FileList.component";
import styles from './Disk.module.sass'
import Popup from "../../Popup/Popup.component";
import InputContainer from "../../../UI/InputContainer";
import Form from "../../../UI/Form";


const Disk = () => {
    const {currentDir, files, dirStack, isLoading} = useAppSelector(state => state.fileReducer)
    const dispatch = useAppDispatch()

    const [isNewDirPopup, setIsNewDirPopup] = useState<boolean>(false)
    const [newDirName, setNewDirname] = useState<string>('')
    const [backBtn, setBackBtn] = useState<boolean>(true)

    const createDirPopupClose = () => setIsNewDirPopup(false);

    function createNewDir(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        dispatch(createFile(currentDir, newDirName))
        setNewDirname('')
        createDirPopupClose()
    }

    useEffect(() => {
        dispatch(getUserFiles(currentDir))
        if(!currentDir) setBackBtn(false)
    }, [currentDir])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setNewDirname(e.target.value)

    const backClickHolder = () => {
        if (dirStack.length >= 1) {
            const backDirId = dirStack.length - 2
            dispatch(returnToPrevDir(dirStack[backDirId]))
        } else{
            dispatch(returnToPrevDir(null))
            setBackBtn(false)
        }
    }

    return (
        <Fragment>
            <Popup isOpen={isNewDirPopup} closePopup={createDirPopupClose}>
                <Form formContainerClass={styles.form}
                      formClassname={styles.form__container}
                      formDisplay={'flex'}
                      onSubmitHandler={createNewDir}
                      formHeading={'Create new directory'}
                      button={{classname: styles.main__buttons__button, btnText: 'Create'}}>
                    <InputContainer containerClass={styles.inputContainer}
                                    label={'Directory name'}
                                    onChangeHandler={onChangeHandler}
                                    value={newDirName} type={'text'}
                                    placeHolder={'Type here ...'}
                                    name={'name'} id={'newDirName'} required={true}/>
                </Form>
            </Popup>
            <main className={styles.main}>
                <div className={styles.main__buttons}>
                    <button style={{display: backBtn ? 'inline-block': 'none'}}
                        onClick={backClickHolder}
                        className={styles.main__buttons__button}>
                        Back
                    </button>
                    <button
                        onClick={() => setIsNewDirPopup(true)}
                        className={styles.main__buttons__button}>
                        Create folder
                    </button>
                </div>
                {isLoading && 'Loading ...'}
                <FileList files={files} setBackBtn={setBackBtn}/>
            </main>
        </Fragment>
    );
};

export default Disk;
