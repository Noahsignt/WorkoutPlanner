'use client'
import { useEffect, useState } from "react";
import { UserContext } from "./context";
import { Activity } from "./interfaces";

import UserForm from "./components/UserForm";
import Header from "./components/Header";
import InfoBloc from "./components/InfoBloc";

import { auth } from "@/firebase/app";
import { getDay } from "../firebase/firestore/crud"
import { onUserChange } from "../firebase/auth/info"

import styles from "./page.module.css";

export default function Home() {  
  const currentDate = new Date();
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  //slice is always just the year, month and day in iso string format
  const [slice, setSlice] = useState([currentDate.toISOString().slice(0, 10), currentDate.toISOString().slice(0, 10)])

  useEffect(() => {
    onUserChange((e : any) => {
      setUser(e);

      getDay(e?.email, slice[0]).then(data => {
        setActivities(data);
      }).catch((error) => {
        console.log(error);
      })
    });
  }, [])

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
