import React, {FC, useEffect, useState} from 'react';
import styles from './Layout.module.sass'
import {useAppSelector} from "../../hooks/useAppSelector";

interface ILayoutProps{
    children: React.ReactNode;
}
const Layout: FC<ILayoutProps> = ({children}) => {
    const {error, success} = useAppSelector(state => state.ntfReducer);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMes, setSuccessMes] = useState<string[]>([]);

    useEffect(()=>{
        if(error) setErrors([...errors, error])
        if(success) setSuccessMes([...successMes, success])
    }, [error, success])

    useEffect(()=>{
        if(successMes.length) setTimeout(()=>setSuccessMes([]), 7000)
        if(errors.length) setTimeout(()=>setErrors([]), 7000)
    }, [errors.length, successMes.length])

    return (
        <div className={styles.layout}>
            {children}
            <div className={styles.ntfs}>
                {errors.map((er, i)=>(
                    <div className={styles.ntfs__error} key={i}>{er}</div>
                ))}
                {successMes.map((mes, i)=>(
                    <div className={styles.ntfs__success} key={i}>{mes}</div>
                ))}
            </div>
        </div>
    );
};

export default Layout;
