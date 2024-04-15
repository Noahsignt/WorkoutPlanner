import { auth } from "../app";
import { createUserWithEmailAndPassword } from "firebase/auth";

const createNewUser = (email, password) => {
    try {
        createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e);
    }
}

export { createNewUser }