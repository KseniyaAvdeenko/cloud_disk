import React, {FC} from 'react';
import styles from './Popup.module.sass'

interface IPopupProps {
    isOpen: boolean;
    closePopup: Function;
    children: React.ReactNode
}

const Popup: FC<IPopupProps> = ({isOpen, closePopup, children}) => {

    return (
        <div onClick={()=>closePopup()} className={isOpen ? [styles.popup, styles.popup__open].join(' ') : styles.popup}>
            <div className={styles.inner} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;
