import React from 'react';
import styles from './Upload.module.sass'
import {useAppSelector} from "../../../../hooks/useAppSelector";

const UploadedFiles = () => {
    const {isVisible, files} = useAppSelector(state => state.uploadedFilesReducer)

    return (
        <div className={styles.uploadedFiles} style={{display: isVisible ?'flex':'none'}}>
            {/*{*/}
            {/*    newFiles.map(file => (*/}
            {/*        <div key={file.file.name}>{file.file.name}</div>*/}
            {/*    ))*/}
            {/*}*/}
            {files && files.map(({id, fileName, progress})=>(
                <div className={styles.uploadedFiles__item} key={id}>
                    <div className={styles.uploadedFiles__item__name}>{fileName}</div>
                    <div className={styles.progress}>
                        <div className={styles.progress__barItems}>
                            <div style={{width: progress +'%'}} className={styles.progress__barItems_done}></div>
                            <div style={{width: (100 - progress)+'%'}} className={styles.progress__barItems_undone}></div>
                        </div>
                        <div>{progress && `${progress}%`}</div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default UploadedFiles;
