import React from 'react';
import styles from './Header.module.sass'
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {activateSignIn, activateSignUp} from "../../store/actions/formsAction";
import {signOutUser} from "../../store/actions/authAction";

const Header = () => {
    const {isAuth} = useAppSelector(state => state.authReducer);
    const {currentUser} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            {isAuth
                ? <div className={styles.header__auth}>
                    <div>{currentUser && currentUser.email}</div>
                    <button onClick={()=>dispatch(signOutUser())}>Sign Out</button>
                </div>
                : <div className={styles.header__auth}>
                    <button onClick={() => dispatch(activateSignIn())}>Sign In</button>
                    <button onClick={() => dispatch(activateSignUp())}>Sign Up</button>
                </div>
            }
        </header>
    );
};

export default Header;
