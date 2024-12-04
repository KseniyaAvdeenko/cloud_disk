import React, {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import styles from './AuthForms.module.sass'
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import Form from "../../UI/Form";
import InputContainer from "../../UI/InputContainer";
import {signInUser, signUpUser} from "../../store/actions/authAction";
import {activateSignIn} from "../../store/actions/formsAction";
import Header from "../Header/Header.component";

const AuthForms = () => {
    const {signInFormDisplay, signUpFormDisplay} = useAppSelector(state => state.authFormsReducer);
    const dispatch = useAppDispatch()
    const [sUpUser, setSignUpUser] = useState<{ email: string, password: string }>({email: '', password: ''})
    const [sInUser, setSignInUser] = useState<{ email: string, password: string }>({email: '', password: ''})

    const onSubmitSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signInUser(sInUser.email, sInUser.password))
        setSignInUser({email: '', password: ''})
    }

    const onSubmitSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(JSON.stringify(sUpUser))
        dispatch(signUpUser(sUpUser.email, sUpUser.password))
        dispatch(activateSignIn())
        setSignUpUser({email: '', password: ''})
    }

    const onChangeSignIn = (e: ChangeEvent<HTMLInputElement>) => setSignInUser({
        ...sInUser,
        [e.target.name]: e.target.value
    })
    const onChangeSignUp = (e: ChangeEvent<HTMLInputElement>) => setSignUpUser({
        ...sUpUser,
        [e.target.name]: e.target.value
    })

    return (
        <Fragment>
            <Header/>
            <main className={styles.authForms}>
                <Form
                    formContainerClass={styles.authForm__outer}
                    formClassname={styles.authForm__inner}
                    formDisplay={signInFormDisplay}
                    onSubmitHandler={onSubmitSignIn}
                    formHeading={'Sign In'}
                    button={{btnText: 'Sign in', classname: ""}}>
                    <InputContainer containerClass={styles.authInputContainer} label={'Email'}
                                    onChangeHandler={onChangeSignIn} value={sInUser.email}
                                    type={'email'} placeHolder={'Type here...'}
                                    name={'email'} id={'signInEmail'} required={true}
                    />
                    <InputContainer containerClass={styles.authInputContainer} label={'Password'}
                                    onChangeHandler={onChangeSignIn} value={sInUser.password}
                                    type={'password'} placeHolder={'Type here...'}
                                    name={'password'} id={'signInPassword'} required={true}
                                    minLength={3} maxLength={12}
                    />
                </Form>
                <Form
                    formContainerClass={styles.authForm__outer}
                    formClassname={styles.authForm__inner}
                    formDisplay={signUpFormDisplay}
                    onSubmitHandler={onSubmitSignUp}
                    formHeading={'Sign Up'}
                    button={{btnText: 'Sign up', classname: ""}}>
                    <InputContainer containerClass={styles.authInputContainer} label={'Email'}
                                    onChangeHandler={onChangeSignUp} value={sUpUser.email}
                                    type={'email'} placeHolder={'Type here ...'}
                                    name={'email'} id={'signUpEmail'} required={true}
                    />
                    <InputContainer containerClass={styles.authInputContainer} label={'Password'}
                                    onChangeHandler={onChangeSignUp} value={sUpUser.password}
                                    type={'password'} placeHolder={'Type here ...'}
                                    name={'password'} id={'signUpPassword'} required={true}
                                    minLength={3} maxLength={12}
                    />
                </Form>
            </main>
        </Fragment>

    );
};

export default AuthForms;
