import React, {FC, Fragment} from 'react';
import Popup from "../../Popup/Popup.component";
import Form from "../../../UI/Form";
import styles from "./Disk.module.sass";
import InputContainer from "../../../UI/InputContainer";

interface IUploadFileProps {
    isNewFilePopup: boolean;
    uploadFilePopupClose: Function
    uploadFilesSubmit: Function
    onUploadHandler: Function;
    newFiles: File[];
    dragEnter: boolean;
    dragEnterHandler: Function
    dragLeaveHandler: Function
    dragOverHandler: Function
    dropHandler: Function
}

const UploadFile: FC<IUploadFileProps> = ({
                                              dragEnterHandler,
                                              dragLeaveHandler,
                                              dragOverHandler,
                                              dropHandler,
                                              dragEnter,
                                              newFiles,
                                              isNewFilePopup,
                                              uploadFilePopupClose,
                                              uploadFilesSubmit,
                                              onUploadHandler
                                          }) => {
    return (
        <Popup isOpen={isNewFilePopup} closePopup={uploadFilePopupClose}>

            <Form formContainerClass={styles.form}
                  formClassname={styles.form__container}
                  formDisplay={'flex'}
                  onSubmitHandler={uploadFilesSubmit}
                  formHeading={'Upload new file'}
                  button={{classname: styles.main__buttons__button, btnText: 'Upload'}}>
                {!dragEnter
                    ? <div className={styles.dragFiles__container}
                           onDragOver={e => dragOverHandler(e)}
                           onDragEnter={e => dragEnterHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}>
                        <InputContainer containerClass={styles.inputContainer}
                                        label={'Download file or move them there'}
                                        onChangeHandler={onUploadHandler}
                                        value={''} type={'file'}
                                        placeHolder={''} multiple={true}
                                        name={'file'} id={'file'}
                                        required={false}/></div>
                    : <div className={styles.dragFiles__container}
                           onDrop={e => dropHandler(e)}
                           onDragEnter={e => dragEnterHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragOverHandler(e)}
                    >
                        <div className={styles.dragFiles}>Move your files here</div>
                    </div>}
                <div style={{marginBottom: '1rem'}}>
                    {
                        newFiles.map(file => (
                            <div key={file.name}>{file.name}</div>
                        ))
                    }
                </div>
            </Form>
        </Popup>
    );
};

export default UploadFile;
