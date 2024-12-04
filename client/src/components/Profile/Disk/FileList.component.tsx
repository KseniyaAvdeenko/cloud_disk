import React, {FC} from 'react';
import {IFile} from "../../../interface/IFile";
import styles from "./Disk.module.sass";
import File from "./File.component";


interface IFileListProps {
    files: IFile[] | [] | null;
    setBackBtn: Function
}

const FileList: FC<IFileListProps> = ({files, setBackBtn}) => {
    return (
        <div className={styles.fileListTable}>
            <div className={styles.fileListTable__rowHead}>
                <div></div>
                <div className={styles.fileListTable__name}>Name</div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.fileListTable__date}>Date</div>
                <div className={styles.fileListTable__size}>Size</div>
            </div>
            {files && files.map(file => (<File file={file} key={file._id} setBackBtn={setBackBtn}/>))}
        </div>
    );
};

export default FileList;
