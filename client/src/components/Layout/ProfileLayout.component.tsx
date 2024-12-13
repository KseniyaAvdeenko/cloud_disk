import React, {FC, Fragment, useEffect, useState} from 'react';
import styles from './Layout.module.sass'
import Sidebar from "../Profile/Sidebar/Sidebar.component";
import {Route, Routes} from "react-router-dom";
import Disk from "../Profile/Disk/Disk.component";
import ProfileSettings from "../Profile/ProfileSettings/ProfileSettings.component";


const ProfileLayout: FC<{children: React.ReactNode}> = ({children}) => {
    return (
         <Fragment>
            <div className={styles.profile}>
                <Sidebar/>
                {children}
            </div>
        </Fragment>
    );
};

export default ProfileLayout;
