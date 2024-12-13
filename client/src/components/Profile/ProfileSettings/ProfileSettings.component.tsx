import React, {useState} from 'react';
import styles from './Settings.module.sass'
import ProfileLayout from "../../Layout/ProfileLayout.component";
import UserInfo from "../UserInfo/UserInfo.component";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {changeCurrentUser, deleteCurrentUserAvatar} from "../../../store/actions/userAction";
import InputContainer from "../../../UI/InputContainer";


const ProfileSettings = () => {
    const {currentUser} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()
    const [userEmail, setUserEmail] = useState<string>(currentUser ? currentUser.email : '');
    const [userPassword, setUserPassword] = useState<string>('');


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') setUserEmail(e.target.value)
        if (e.target.name === 'password') setUserPassword(e.target.value)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement;
        if(form.id === 'emailForm') dispatch(changeCurrentUser({email: userEmail}))
        if(form.id === 'passwordForm') dispatch(changeCurrentUser({password: userPassword}))

    }

    return (
        <ProfileLayout>
            <main className={styles.main}>
                {currentUser && (
                    <div className={styles.form}>
                        <UserInfo>
                            <div>
                                <button onClick={() => dispatch(deleteCurrentUserAvatar())} className={styles.button}>
                                    Remove avatar
                                </button>
                            </div>
                        </UserInfo>
                        <form onSubmit={e => submitHandler(e)} id={'emailForm'} className={styles.form__container}>
                            <InputContainer containerClass={styles.inputContainer} label={'Email'}
                                            onChangeHandler={changeHandler} value={userEmail} type={'email'}
                                            placeHolder={'Type here...'} name={'email'} id={'email'} required={true}/>

                            <button type={"submit"} className={styles.button}>Save</button>
                        </form>
                        <form onSubmit={e => submitHandler(e)} id={'passwordForm'} className={styles.form__container}>

                            <InputContainer containerClass={styles.inputContainer} label={'Change password'}
                                            onChangeHandler={changeHandler} value={userPassword}
                                            type={'password'} maxLength={12} name={'password'}
                                            placeHolder={''} id={'password'} required={true}
                                            minLength={3}/>
                            <button type={"submit"} className={styles.button}>Save</button>
                        </form>

                    </div>
                )}

            </main>
        </ProfileLayout>
    );
};

export default ProfileSettings;
