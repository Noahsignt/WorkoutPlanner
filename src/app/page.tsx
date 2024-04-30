'use client'
import { useState } from "react";
import { UserContext } from "./context";

import UserForm from "./components/UserForm";
import Header from "./components/Header";
import InfoBloc from "./components/InfoBloc";

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
        {user ? 
        <></>
        : 
        <div className={styles['home-main']}>
          <InfoBloc title="test" text="test" flavour="test" src="/home_info/placeholder.jpeg"/>
          <UserForm />
        </div> 
        }
      </UserContext.Provider>
    </main>
  );
}
