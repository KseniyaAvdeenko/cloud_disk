import React, {FC} from 'react';
import {IFile} from "../../../interface/IFile";
import styles from "./Disk.module.sass";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setDirectoryName} from "../../../store/actions/fileAction";

const File: FC<{ file: IFile; setBackBtn: Function }> = ({file, setBackBtn}) => {
    const dispatch = useAppDispatch();


    const openDirHandler = (file: IFile) => {
        if (file.type === 'dir') {
            dispatch(setDirectoryName(file._id))
            setBackBtn(true)
        }
    }

    return (
        <div className={styles.fileListTable__row} onClick={() => openDirHandler(file)}>
            <div className={styles.fileListTable__fileIcon}>{
                file.type === 'dir'
                    ? <svg width="20" height="16" viewBox="0 0 20 16" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2H10L8 0Z"
                            fill="#1F3453"/>
                    </svg>
                    : <svg width="16" height="22" viewBox="0 0 16 22" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.59299 21.258L8.58199 21.26L8.51099 21.295L8.49099 21.299L8.47699 21.295L8.40599 21.26C8.39532 21.2567 8.38732 21.2583 8.38199 21.265L8.37799 21.275L8.36099 21.703L8.36599 21.723L8.37599 21.736L8.47999 21.81L8.49499 21.814L8.50699 21.81L8.61099 21.736L8.62299 21.72L8.62699 21.703L8.60999 21.276C8.60732 21.2653 8.60166 21.2593 8.59299 21.258ZM8.85799 21.145L8.84499 21.147L8.65999 21.24L8.64999 21.25L8.64699 21.261L8.66499 21.691L8.66999 21.703L8.67799 21.71L8.87899 21.803C8.89165 21.8063 8.90132 21.8037 8.90799 21.795L8.91199 21.781L8.87799 21.167C8.87466 21.155 8.86799 21.1477 8.85799 21.145ZM8.14299 21.147C8.13858 21.1443 8.13331 21.1435 8.12828 21.1446C8.12325 21.1457 8.11885 21.1487 8.11599 21.153L8.10999 21.167L8.07599 21.781C8.07666 21.793 8.08232 21.801 8.09299 21.805L8.10799 21.803L8.30899 21.71L8.31899 21.702L8.32299 21.691L8.33999 21.261L8.33699 21.249L8.32699 21.239L8.14299 21.147Z"
                            fill="#1F3453"/>
                        <path
                            d="M8 0V6.5C8.00002 6.87288 8.13892 7.23239 8.38962 7.50842C8.64032 7.78445 8.98484 7.9572 9.356 7.993L9.5 8H16V18C16.0002 18.5046 15.8096 18.9906 15.4665 19.3605C15.1234 19.7305 14.6532 19.9572 14.15 19.995L14 20H2C1.49542 20.0002 1.00943 19.8096 0.639452 19.4665C0.269471 19.1234 0.0428434 18.6532 0.00500021 18.15L1.00268e-07 18V2C-0.000159579 1.49542 0.190406 1.00943 0.533497 0.639452C0.876587 0.269471 1.34684 0.0428433 1.85 0.00500011L2 0H8ZM10 0.043C10.3234 0.11165 10.6247 0.259389 10.877 0.473L11 0.586L15.414 5C15.6483 5.23411 15.8208 5.52275 15.916 5.84L15.956 6H10V0.043Z"
                            fill="#1F3453"/>
                    </svg>
            }
            </div>
            <div className={styles.fileListTable__name}>{file.name}</div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.fileListTable__date}></div>
            <div className={styles.fileListTable__size}>{file.size}</div>
        </div>
    );
};

export default File;
