import React, {FC} from 'react';
import Popup from "../../../Popup/Popup.component";
import styles from "../Disk.module.sass";
import Input from "../../../../UI/Input";
import UploadedFiles from "./UploadedFiles.component";

interface IUploadFileProps {
    isNewFilePopup: boolean;
    uploadFilePopupClose: Function
    closeUploadFiles: Function
    onUploadHandler: Function;
    dragEnter: boolean;
    dragEnterHandler: Function
    dragLeaveHandler: Function
    dragOverHandler: Function
    dropHandler: Function
}

const UploadFileForm: FC<IUploadFileProps> = ({
                                              dragEnterHandler,
                                              dragLeaveHandler,
                                              dragOverHandler,
                                              dropHandler,
                                              dragEnter,
                                              isNewFilePopup,
                                              uploadFilePopupClose,
                                              closeUploadFiles,
                                              onUploadHandler
                                          }) => {


    return (
        <Popup isOpen={isNewFilePopup} closePopup={uploadFilePopupClose}>
            <div className={styles.form}>
                <div className={styles.form__container}>
                    {!dragEnter
                        ? <div className={styles.dragFiles__container}
                               onDragOver={e => dragOverHandler(e)}
                               onDragEnter={e => dragEnterHandler(e)}
                               onDragLeave={e => dragLeaveHandler(e)}>
                            <div className={styles.inputContainer}>
                                <label htmlFor={'file'}>
                                    <Input
                                        onChangeHandler={onUploadHandler}
                                        value={''} type={'file'}
                                        placeHolder={''} required={true}
                                        name={'file'} id={'file'} multiple={true}
                                    />
                                    {'Download file or move them there'}
                                </label>
                            </div>
                        </div>
                        : <div className={styles.dragFiles__container}
                               onDrop={e => dropHandler(e)}
                               onDragEnter={e => dragEnterHandler(e)}
                               onDragLeave={e => dragLeaveHandler(e)}
                               onDragOver={e => dragOverHandler(e)}
                        >
                            <div className={styles.dragFiles}>Move your files here</div>
                        </div>}
                        <UploadedFiles/>
                </div>
                <button onClick={e=>closeUploadFiles(e)} className={styles.main__buttons__button}>Close</button>
            </div>
        </Popup>
    );
};

export default UploadFileForm;
