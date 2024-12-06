import axios from "axios";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {checkAuth} from "../store/actions/authAction";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    if (config.headers) config.headers.Authorization = `Bearer ${localStorage.access}`
    return config;
})

axiosInstance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    try {
        const dispatch = useAppDispatch()
        originalRequest._isRetry = true
        if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
            dispatch(checkAuth())
            axiosInstance.request(originalRequest)
        }
    } catch (e) {
        console.log(e)
    }
    throw error
})
export default axiosInstance;