import { auth } from "../app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const signup = (email, password) => {
    try {
        createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e);
    }
}

const login = (email, password) => {
    try{
        signInWithEmailAndPassword(auth, email, password)
    } catch(e) {
        console.log(e)
    }
}

export { signup, login }