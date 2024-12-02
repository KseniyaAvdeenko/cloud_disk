import React, {Fragment, useEffect, useState} from 'react';
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {checkAuth} from "./store/actions/authAction";
import {getCurrentUser} from "./store/actions/userAction";
import AuthForms from "./components/AuthForms/AuthForms";
import Layout from "./components/Layout/Layout";

function App() {
    const {accessToken, isAuth} = useAppSelector(state => state.authReducer);
    const {currentUser} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(checkAuth())
            dispatch(getCurrentUser())
        }
    }, [accessToken])

    return !isAuth ? (
        <Layout >
            <AuthForms/>
        </Layout>
    ) : (
        <Layout>
            happy hacking {currentUser && currentUser.email}
        </Layout>
    );
}

export default App;
