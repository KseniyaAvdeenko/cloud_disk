import React, {ChangeEvent, FC, FormEvent, Fragment, useState} from 'react';
import styles from './AuthForms.module.sass'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import Form from "../../UI/Form";
import InputContainer from "../../UI/InputContainer";
import {signInUser, signUpUser} from "../../store/actions/authAction";
import {IAuthForm} from "../../interface/IIntialStates";

interface IAuthFormsProps {
    authForm: IAuthForm;
    activateSignInForm: Function
    activateSignUpForm: Function
}

const AuthForms: FC<IAuthFormsProps> = ({authForm, activateSignUpForm, activateSignInForm }) => {
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
        activateSignInForm()
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
            <main className={styles.authForms}>
                <Form
                    formContainerClass={styles.authForm__outer}
                    formClassname={styles.authForm__inner}
                    formDisplay={authForm.signInFormDisplay}
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
                    formDisplay={authForm.signUpFormDisplay}
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
