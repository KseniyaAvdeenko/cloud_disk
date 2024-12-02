import React, {FC} from 'react';
import styles from './Layout.module.sass'
import Header from "../header/Header";

interface ILayoutProps{
    children: React.ReactNode
}
const Layout: FC<ILayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;
