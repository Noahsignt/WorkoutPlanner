import styles from "./UserForm.module.css"
import { signup, login } from "@/firebase/auth/login"

import { FormEvent, useState } from "react";

export default function UserForm({ miniDisplay=false, closePopup= () => {} }) {
    const [isLogin, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitSignUp = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signup(email, password);
    }

    const submitLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(email, password);
    }

    return (
        isLogin ? 
        <div className={`${styles['user-form']} ${miniDisplay ? styles['user-form-mini'] : ''}`}>
            {!miniDisplay ? <h1>Login</h1> : <div className={styles['user-form-close']} onClick={closePopup}>x</div>}
            <form onSubmit={submitLogin}>
                <div className={styles['user-form-bloc']}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className={styles['user-form-bloc']}>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <input type="submit" value="Login"/>
            </form>
            <button className={styles['user-form-swapper']} onClick={() => setLogin(false)}>Register</button>
        </div>
        :
        <div className={`${styles['user-form']} ${miniDisplay ? styles['user-form-mini'] : ''}`}>
            {!miniDisplay ? <h1>Sign Up</h1> : <div className={styles['user-form-close']} onClick={closePopup}>x</div>}
            <form onSubmit={submitSignUp}>
                <div className={styles['user-form-bloc']}>
                    <label htmlFor="email">Email:</label>
                    <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className={styles['user-form-bloc']}>
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <input type="submit" value="Register"/>
            </form>
            <button className={styles['user-form-swapper']} onClick={() => setLogin(true)}>Login</button>
        </div>
    );
}