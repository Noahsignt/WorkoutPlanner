'use client'
import { useContext } from 'react';

import styles from "./Header.module.css"
import { UserContext } from "../context"

import { logout } from '@/firebase/auth/login';

export default function Header() {
    const user =  useContext(UserContext);

    const UserButton = () => {
        return(
            <button onClick={user ? () => logout() :  () => popup()}>
                {user ? 'Log Out' : 'Login'}
            </button>
        )
    }

    const popup = () => {
        console.log('dummy');
    }

    return (
    <div className={styles["header"]}>
        <h1>Workout Planner</h1>
        <UserButton />
    </div>)
}