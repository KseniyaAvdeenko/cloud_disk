import React, {useEffect} from 'react';
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {checkAuth} from "./store/actions/authAction";
import {getCurrentUser} from "./store/actions/userAction";
import AuthForms from "./components/AuthForms/AuthForms.component";
import Layout from "./components/Layout/Layout.component";
import Profile from "./components/Profile/Profile.component";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    const {accessToken, isAuth} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(checkAuth())
            dispatch(getCurrentUser())
        }
    }, [accessToken])

    return (
        <BrowserRouter>
            <Layout>
                {!isAuth
                    ? <Routes>
                        <Route path={'/'} element={<AuthForms/>}/>
                    </Routes>
                    : <Routes>
                        <Route path={'/'} element={<Profile/>}/>
                    </Routes>
                }
            </Layout>
        </BrowserRouter>

    );
}

export default App;
