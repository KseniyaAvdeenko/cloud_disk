import React, {Fragment, useState} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Profile.module.sass'
import Header from "../Header/Header.component";
import Sidebar from "./Sidebar.component";
import Disk from "./Disk/Disk.component";


const ProfileComponent = () => {
    const {currentUser} = useAppSelector(state => state.userReducer);

    return (
        <Fragment>
            <Header imgHeight={20}/>
            <div className={styles.profile}>
                <Sidebar currentUser={currentUser}/>
                <Disk/>
            </div>
        </Fragment>

    );
};

export default ProfileComponent;
