import React, {FC} from 'react';
import Form from "../../../UI/Form";
import styles from "./Disk.module.sass";
import InputContainer from "../../../UI/InputContainer";
import Popup from "../../Popup/Popup.component";

interface ICreateDirProps {
    isNewDirPopup: boolean;
    createDirPopupClose: Function;
    createNewDir: Function;
    onChangeHandler: Function;
    newDirName: string
}

const CreateDir: FC<ICreateDirProps> = ({
                                            newDirName,
                                            onChangeHandler,
                                            isNewDirPopup,
                                            createDirPopupClose,
                                            createNewDir
                                        }) => {
    return (
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
    );
};

export default CreateDir;
