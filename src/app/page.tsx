'use client'
import { useState } from "react";
import { UserContext } from "./context";

import UserForm from "./components/UserForm";
import Header from "./components/Header";

import { auth } from "@/firebase/app";
import { getDay } from "../firebase/firestore/crud"
import { onUserChange } from "../firebase/auth/info"

import styles from "./page.module.css";

export default function Home() {  
  const [user, setUser] = useState(null);
  onUserChange((e : any) => {
    setUser(e);
  });

  return (
    <main>  
      <UserContext.Provider value={user}>
        <Header />
        {user ? <></> : <UserForm />}
      </UserContext.Provider>
    </main>
  );
}
