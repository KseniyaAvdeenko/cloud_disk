import React, {useEffect} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getUserFiles} from "../../../store/actions/fileAction";
import FileList from "./FileList";
import styles from './Disk.module.sass'

const Disk = () => {
    const {currentDir, files} = useAppSelector(state => state.fileReducer)
    const dispatch =useAppDispatch()

    useEffect(()=>{
        dispatch(getUserFiles(currentDir))
    }, [currentDir])

    return (
        <main className={styles.main}>
            <div className={styles.main__buttons}>
                <button className={styles.main__buttons__button}>Back</button>
                <button className={styles.main__buttons__button}>Create folder</button>
            </div>
            <FileList files={files}/>
        </main>
    );
};

export default Disk;
