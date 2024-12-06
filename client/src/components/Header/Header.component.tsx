import React, {FC} from 'react';
import styles from './Header.module.sass'
import {useAppSelector} from "../../hooks/useAppSelector";
import Logo from '../../assets/img/logo.png'

interface IHeaderProps {
    imgHeight: number;
    activateSignInForm: Function;
    activateSignUpForm: Function;
}

const Header: FC<IHeaderProps> = ({imgHeight, activateSignUpForm, activateSignInForm}) => {
    const {isAuth} = useAppSelector(state => state.authReducer);

    return (
        <header className={styles.header}>
            <img src={Logo} height={imgHeight} alt="logo"/>
            {!isAuth &&
                (<div className={styles.header__auth}>
                    <button onClick={() => activateSignInForm()}>Sign In</button>
                    <button onClick={() => activateSignUpForm()}>Sign Up</button>
                </div>)
            }
        </header>
    );
};

export default Header;
