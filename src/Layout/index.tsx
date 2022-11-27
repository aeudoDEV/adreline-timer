import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import styles from './index.module.scss';

export function Layout(){
    return(
        <div className={styles.Container}>
            <Header/>
            <Outlet/>
        </div>
    );
}