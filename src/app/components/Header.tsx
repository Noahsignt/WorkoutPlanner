'use client'
import { useContext, useState, useEffect } from 'react';

import styles from "./Header.module.css"
import { UserContext } from "../context"
import UserForm from "./UserForm"

import { logout } from '@/firebase/auth/login';

export default function Header() {
    const [displayPopup, SetPopup] = useState(false);
    const user =  useContext(UserContext);

    useEffect(() => {
        SetPopup(false);
    }, [user]);

    const UserButton = () => {
        return(
            <button className={styles['header-button']} onClick={user ? () => logout() :  () => SetPopup(true)}>
                {user ? 'Log Out' : 'Login'}
            </button>
        )
    }

    return (
    <div className={styles["header"]}>
        <h1>Workout Planner</h1>
        <UserButton />
        {displayPopup ? <UserForm miniDisplay={true} closePopup={() => SetPopup(false)}/> : null}
    </div>)
}