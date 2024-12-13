import React, {useEffect, useState} from 'react';
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {checkAuth} from "./store/actions/authAction";
import {getCurrentUser} from "./store/actions/userAction";
import AuthForms from "./components/AuthForms/AuthForms.component";
import Layout from "./components/Layout/Layout.component";
import Profile from "./components/Profile/Profile.component";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header.component";
import {IAuthForm} from "./interface/IIntialStates";
import ProfileSettings from "./components/Profile/ProfileSettings/ProfileSettings.component";

function App() {
    const {accessToken, isAuth} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const [authForm, setAuthForm] = useState<IAuthForm>({
        activeForm: 'signIn',
        signUpFormDisplay: 'none',
        signInFormDisplay: 'flex'
    })

    const activateSignInForm = () => setAuthForm({
        activeForm: 'signIn',
        signInFormDisplay: 'flex',
        signUpFormDisplay: 'none'
    })
    const activateSignUpForm = () => setAuthForm({
        activeForm: 'signUp',
        signInFormDisplay: 'none',
        signUpFormDisplay: 'flex'
    })

    useEffect(() => {
        if (accessToken) dispatch(checkAuth())
    }, [accessToken])

    return (
        <BrowserRouter>
            <Layout>
                <Header imgHeight={isAuth ? 20 : 40}
                        activateSignInForm={activateSignInForm}
                        activateSignUpForm={activateSignUpForm}
                />
                {!isAuth
                    ? <Routes>
                        <Route path={'/'} element={<AuthForms
                            authForm={authForm}
                            activateSignInForm={activateSignInForm}
                            activateSignUpForm={activateSignUpForm}/>
                        }/>
                    </Routes>
                    : <Routes>
                        <Route path={'/'} element={<Profile/>}/>
                        <Route path={'/settings'} element={<ProfileSettings/>}/>
                    </Routes>
                }
            </Layout>
        </BrowserRouter>
    );
}

export default App;
