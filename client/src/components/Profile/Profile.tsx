import React, {Fragment} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Profile.module.sass'
import Header from "../Header/Header";
import Sidebar from "./Sidebar";

const Profile = () => {
    const {currentUser} = useAppSelector(state => state.userReducer);
    return (
        <Fragment>
            <Header imgHeight={20}/>
            <div className={styles.profile}>
                <Sidebar currentUser={currentUser}/>
                <main></main>
            </div>
        </Fragment>

    );
};

export default Profile;
