import React, {Fragment} from 'react';
import styles from './Header.module.sass'
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";

const Header = () => {
    const {isAuth} = useAppSelector(state => state.authReducer);
    const {currentUser} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            {isAuth
                ? <div>{currentUser && currentUser.email}
                    <button>Sign Out</button>
                </div>
                : <div>
                    <button>sign In</button>
                    <button>sign Up</button>
                </div>
            }
        </header>
    );
};

export default Header;
