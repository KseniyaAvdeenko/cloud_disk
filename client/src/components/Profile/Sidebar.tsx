import React, {FC} from 'react';
import styles from "./Profile.module.sass";
import {IUser} from "../../interface/IUser";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {signOutUser} from "../../store/actions/authAction";
import SignOutIcon from '../../assets/img/signOut.svg'

const Sidebar: FC<{ currentUser: IUser | null }> = ({currentUser}) => {
    const dispatch = useAppDispatch()
    return (
        <aside className={styles.sidebar}>
            <div className={styles.currentUser}>
                <div className={styles.currentUser__avatar} style={{
                    background: currentUser?.avatar ? `url(${currentUser.avatar}) 100% 100% / cover no-repeat` : '#3D5A80'
                }}></div>
                <div>{currentUser && currentUser.email}</div>
            </div>
            <div></div>
            <div className={styles.signOut} onClick={() => dispatch(signOutUser())}>
                <img src={SignOutIcon} alt="sign out"/>
                Sign out
            </div>
        </aside>
    );
};

export default Sidebar;
