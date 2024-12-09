import React, {Fragment, useState} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Profile.module.sass'
import Header from "../Header/Header.component";
import Sidebar from "./Sidebar.component";
import Disk from "./Disk/Disk.component";


const ProfileComponent = () => {
    return (
        <Fragment>
            <div className={styles.profile}>
                <Sidebar/>
                <Disk/>
            </div>
        </Fragment>

    );
};

export default ProfileComponent;
