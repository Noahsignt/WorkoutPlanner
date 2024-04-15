import { auth } from "../app";
import { onAuthStateChanged } from "firebase/auth";

// used to track functions to be called when user changes
const callbacks = []

const onUserChange = (callback) => {
    callbacks.push(callback);
};

const notifyUserChange = (user) => {
    callbacks.forEach(callback => {
        callback(user);
    });
};

onAuthStateChanged(auth, (user) => {
    notifyUserChange(user);
});

export { onUserChange }
