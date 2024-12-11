import React, {Fragment} from 'react';
import styles from './Profile.module.sass'
import Sidebar from "./Sidebar/Sidebar.component";
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
