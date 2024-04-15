import styles from "./UserForm.module.css"
import { signup, login } from "@/firebase/auth/login"

import { FormEvent, useState } from "react";

export default function UserForm() {
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
        <form className={styles['user-form']} onSubmit={submitLogin}>
           <label htmlFor="email">Email:</label>
           <input 
              type="text" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
           />
           <label htmlFor="password">Password:</label>
           <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
           />
           <input type="submit" value="Log in"/>
        </form>
    );
}