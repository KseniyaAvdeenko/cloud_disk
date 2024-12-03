import React, {FC} from 'react';
import styles from './Header.module.sass'
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {activateSignIn, activateSignUp} from "../../store/actions/formsAction";
import Logo from '../../assets/img/logo.png'

const Header: FC<{ imgHeight?: number }> = ({imgHeight = 40}) => {
    const {isAuth} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            <img src={Logo} height={imgHeight} alt="logo"/>
            {!isAuth &&
                (<div className={styles.header__auth}>
                    <button onClick={() => dispatch(activateSignIn())}>Sign In</button>
                    <button onClick={() => dispatch(activateSignUp())}>Sign Up</button>
                </div>)
            }
        </header>
    );
};

export default Header;
