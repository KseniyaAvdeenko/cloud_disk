import React, {FC} from 'react';
import {IFile} from "../../../interface/IFile";
import styles from "./Disk.module.sass";
import File from "./File.component";


interface IFileListProps {
    files: IFile[] | [] | null;
    setBackBtn: Function;
}

const FileList: FC<IFileListProps> = ({files, setBackBtn}) => {
    return (
        <div className={styles.fileListTable}>
            <div className={styles.rowHead}>
                <div></div>
                <div className={styles.row__name}>Name</div>
                <div className={styles.cell}></div>
                <div className={styles.row__date}>Date</div>
                <div className={styles.row__size}>Size</div>
                <div className={styles.cell}></div>
            </div>
            {files && files.map(file => (<File file={file} key={file._id} setBackBtn={setBackBtn}/>))}
        </div>
    );
};

export default FileList;
