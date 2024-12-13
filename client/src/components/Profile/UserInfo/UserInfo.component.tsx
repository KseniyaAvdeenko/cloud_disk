import React, {FC} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {updateCurrentUserAvatar} from "../../../store/actions/userAction";
import styles from "./UserInfo.module.sass";
import Input from "../../../UI/Input";
import sizeFormat from "../../../utils/sizeFormat";

interface IUserInfoProps {
    children?: React.ReactNode
}

const UserInfo: FC<IUserInfoProps> = ({children}) => {
    const {currentUser} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()
    const currentUserAvatar = currentUser?.avatar ? `${process.env.REACT_APP_API_URL}${currentUser.avatar}` : null

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) dispatch(updateCurrentUserAvatar(e.target.files[0]))
    }

    return (
        <div className={styles.currentUser}>
            <label htmlFor={'avatar'} className={styles.currentUser__avatar} style={{
                background: currentUserAvatar ? `url(${currentUserAvatar}) 100% 50% / cover no-repeat` : '#3D5A80'
            }}>
                <Input
                    onChangeHandler={onChangeHandler}
                    value={''}
                    type={'file'}
                    accept={'image/*'}
                    name={'avatar'}
                    id={'avatar'}
                    required={true}
                    multiple={false}
                />
            </label>
            {children && children}
            {currentUser && (<div><b>{currentUser.email}</b></div>)}
            {currentUser && (<div className={styles.currentUser__diskSpace}>
                <p><b>Disk space:</b> {sizeFormat(currentUser.diskSpace)}</p>
                <div className={styles.currentUser__diskSpace__memory}>
                    <div className={styles.currentUser__diskSpace__memory_used}
                         style={{width: (currentUser.usedSpace * 100) / currentUser.diskSpace + '%'}}></div>
                    <div className={styles.currentUser__diskSpace__memory_free}
                         style={{width: 100 - ((currentUser.usedSpace * 100) / currentUser.diskSpace) + '%'}}></div>
                </div>
            </div>)}
        </div>
    );
};

export default UserInfo;
