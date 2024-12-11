import React, {FC} from 'react';
import {IFile} from "../../../../interface/IFile";
import styles from "./Files.module.sass";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {deleteFile, downLoadFile, setDirectoryName} from "../../../../store/actions/fileAction";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import sizeFormat from "../../../../utils/sizeFormat";
import DirectoryIcon from "../../../../UI/Icons/DirectoryIcon";
import FileIcon from "../../../../UI/Icons/FileIcon";
import DownloadIcon from "../../../../UI/Icons/DownloadIcon";
import DeleteIcon from "../../../../UI/Icons/DeleteIcon";


interface IFileProps {
    file: IFile;
    setBackBtn: Function;
}

const File: FC<IFileProps> = ({file, setBackBtn}) => {
    const {currentDir, view} = useAppSelector(state => state.fileReducer)
    const dispatch = useAppDispatch();


    const openDirHandler = (file: IFile) => {
        if (file.type === 'dir') {
            dispatch(setDirectoryName(file._id))
            setBackBtn(true)
        }
    }

    const downLoadFileHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        await downLoadFile(file);
    }

    const deleteFileHandler = () => {
        dispatch(deleteFile(file._id, currentDir))
    }


    return view === 'list' ? (
        <div className={styles.row} onClick={() => openDirHandler(file)}>
            <div className={styles.row__fileIcon}>{
                file.type === 'dir'
                    ? <DirectoryIcon size={'small'} bg={"#1F3453"}/>
                    : <FileIcon size={'small'} bg={"#1F3453"}/>
            }
            </div>
            <div className={styles.row__name}>{file.name}</div>
            {file.type !== "dir" && (
                <div className={styles.row__download} onClick={(e) => downLoadFileHandler(e)}>
                    <DownloadIcon bg={"#1F3453"}/>
                </div>
            )}
            <div className={styles.row__date}>{file.date.slice(0, 10)}</div>
            {file.type !== "dir" && (
                <div className={styles.row__size}>{sizeFormat(file.size)}</div>
            )}
            <div className={styles.row__delete} onClick={deleteFileHandler}>
                <DeleteIcon bg={'#1F3453'}/>
            </div>
        </div>
    ) : (
        <div className={styles.rowIcon} onClick={() => openDirHandler(file)}>
            <div className={styles.rowIcon__container_row}>
                <div className={styles.rowIcon__fileIcon}>{
                    file.type === 'dir'
                        ? <DirectoryIcon size={'big'} bg={"#1F3453"}/>
                        : <FileIcon size={'big'} bg={"#1F3453"}/>
                }
                </div>
                <div className={styles.rowIcon__container_column}>
                    {file.type !== "dir" && (
                        <div className={styles.rowIcon__download} onClick={(e) => downLoadFileHandler(e)}>
                            <DownloadIcon bg={"#1F3453"}/>
                        </div>
                    )}
                    <div className={styles.rowIcon__delete} onClick={deleteFileHandler}>
                        <DeleteIcon bg={'#1F3453'}/>
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.rowIcon__name} data-tip={file.name}>
                    <b>Name: </b>{file.name.length > 12 ? `${file.name.substring(0, 9)}...` : file.name}
                </div>

                <div className={styles.rowIcon__date}><b>Date:</b> {file.date.slice(0, 10)}</div>

                <div className={styles.rowIcon__size}><b>Type:</b> {file.type === 'dir' ? 'directory': file.type}</div>
            </div>
        </div>
    )
};

export default File;
