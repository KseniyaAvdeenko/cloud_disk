import React, {FC, useState} from 'react';
import styles from "./Profile.module.sass";
import {IUser} from "../../interface/IUser";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {signOutUser} from "../../store/actions/authAction";
import SignOutIcon from '../../assets/img/signOut.svg'
import Input from "../../UI/Input";
import {useAppSelector} from "../../hooks/useAppSelector";
import {updateCurrentUser} from "../../store/actions/userAction";
import Loader from "../../UI/Loader/Loader";

const Sidebar: FC = () => {
     const {currentUser, isLoading} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()


    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]) dispatch(updateCurrentUser(e.target.files[0]))
    }

    if(isLoading) return (<aside className={styles.sidebar}><Loader/></aside>)

    return (
        <aside className={styles.sidebar}>
            <div className={styles.currentUser}>
                <label htmlFor={'avatar'} className={styles.currentUser__avatar} style={{
                    background: currentUser?.avatar ? `url(${currentUser.avatar}) 100% 100% / cover no-repeat` : '#3D5A80'
                }}>
                    <Input
                        onChangeHandler={onChangeHandler}
                        value={''}
                        type={'file'}
                        placeHolder={''}
                        name={'avatar'}
                        id={'avatar'}
                        required={true}
                        multiple={false}
                    />
                </label>
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
