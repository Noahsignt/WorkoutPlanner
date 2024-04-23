import { auth } from "../app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

const logout = () => {
    signOut(auth).then(() => {
        console.log('user signed out');
      }).catch((error) => {
        console.log(e);
      });      
}

export { signup, login, logout }