import React, {FC} from 'react';
import styles from './Popup.module.sass'

interface IPopupProps {
    isOpen: boolean;
    closePopup: Function;
    children: React.ReactNode
}

const Popup: FC<IPopupProps> = ({isOpen, closePopup, children}) => {

    return (
        <div onClick={()=>closePopup()} className={styles.popup} style={{display: isOpen ? 'flex':'none'}}>
            <div className={styles.inner} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;
