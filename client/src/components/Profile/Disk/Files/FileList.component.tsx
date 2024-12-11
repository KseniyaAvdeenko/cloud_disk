import React, {FC} from 'react';
import {IFile} from "../../../../interface/IFile";
import styles from "./Files.module.sass";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import File from "./File.component";


interface IFileListProps {
    files: IFile[] | [] | null;
    setBackBtn: Function;
}

const FileList: FC<IFileListProps> = ({files, setBackBtn}) => {
    const {view} = useAppSelector(state => state.fileReducer)
    return (
        <div className={view === 'list' ? styles.fileListTable : styles.fileListIcons}>
            <div className={styles.rowHead} style={{display: view === 'list' ? 'grid' : 'none'}}>
                <div className={styles.rowHead__fileIcon}></div>
                <div className={styles.rowHead__name}>Name</div>
                <div className={styles.rowHead__download}></div>
                <div className={styles.rowHead__date}>Date</div>
                <div className={styles.rowHead__size}>Size</div>
                <div className={styles.rowHead__delete}></div>
            </div>
            {files && files.map(file => (
                <File file={file} setBackBtn={setBackBtn} key={file._id}/>
            ))}
            {files && !files.length && (<div className={styles.centered}>There is not any file</div>)}
        </div>
    );
};

export default FileList;
