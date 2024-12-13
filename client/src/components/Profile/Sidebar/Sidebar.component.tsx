import React, {FC} from 'react';
import styles from "./Sidebar.module.sass";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {signOutUser} from "../../../store/actions/authAction";
import {useAppSelector} from "../../../hooks/useAppSelector";
import Loader from "../../../UI/Loader/Loader";
import {NavLink} from "react-router-dom";
import DirectoryIcon from "../../../UI/Icons/DirectoryIcon";
import SettingsIcon from "../../../UI/Icons/SettingsIcon";
import LogOutIcon from "../../../UI/Icons/LogOutIcon";
import UserInfo from "../UserInfo/UserInfo.component";


const Sidebar: FC = () => {
    const {currentUser, isLoading} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()

    if (isLoading) return (<aside className={styles.sidebar}><Loader/></aside>)

    return (
        <aside className={styles.sidebar}>
            {currentUser && (
                <>
                    <UserInfo/>
                    <NavLink className={({isActive}) => isActive ? styles.linkActive : styles.link} to={'/'}>
                        <DirectoryIcon size={'small'} bg={'#ffffff'}/>
                        <p>My files</p>
                    </NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.linkActive : styles.link} to={'/settings'}>
                        <SettingsIcon bg={'#ffffff'}/><p>Settings</p>
                    </NavLink>
                    <div className={styles.signOut} onClick={() => dispatch(signOutUser())}>
                        <LogOutIcon bg={'#ffffff'}/>
                        <p>Sign out</p>
                    </div>
                </>)
            }
        </aside>
    );
};

export default Sidebar;
