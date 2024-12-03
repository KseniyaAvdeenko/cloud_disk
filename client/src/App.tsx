import React, {useEffect} from 'react';
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {checkAuth} from "./store/actions/authAction";
import {getCurrentUser} from "./store/actions/userAction";
import AuthForms from "./components/AuthForms/AuthForms";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";

function App() {
    const {accessToken, isAuth} = useAppSelector(state => state.authReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(checkAuth())
            dispatch(getCurrentUser())
        }
    }, [accessToken])

    return  (
        <Layout >
            {!isAuth
                ? <AuthForms/>
                : <Profile/>
            }
        </Layout>
    );
}

export default App;
