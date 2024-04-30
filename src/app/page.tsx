'use client'
import { useEffect, useState } from "react";
import { UserContext } from "./context";
import { ActivityInterface } from "./interfaces";

import UserForm from "./components/UserForm";
import Header from "./components/Header";
import InfoBloc from "./components/InfoBloc";
import Activity from "./components/Activity";

import { auth } from "@/firebase/app";
import { getDay } from "../firebase/firestore/crud"
import { onUserChange } from "../firebase/auth/info"

import styles from "./page.module.css";
import { render } from "react-dom";

export default function Home() {  
  const currentDate = new Date();
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState<ActivityInterface[]>([]);
  //slice is always just the year, month and day in iso string format
  const [slice, setSlice] = useState([currentDate.toISOString().slice(0, 10), currentDate.toISOString().slice(0, 10)])

  useEffect(() => {
    onUserChange((e : any) => {
      setUser(e);

      getDay(e?.email, slice[0]).then(data => {
        //add date to activities
        setActivities(data.map((e : any) => ({...e, date: slice[0]})));
      }).catch((error) => {
        console.log(error);
      })
    });
  }, [])

  const renderActivities = () => {
    return(
      activities.map((e, idx) => {
        return <Activity description={e.description} type={e.type} duration={e.duration} date={e.date} key={idx} />
      })
    )
  }

  return (
    <main>  
      <UserContext.Provider value={user}>
        <Header />
        {user ? 
        <div className={styles['home-main-user']}>
          {renderActivities()}
        </div>
        : 
        <div className={styles['home-main-anon']}>
          <InfoBloc title="test" text="test" flavour="test" src="/home_info/placeholder.jpeg"/>
          <UserForm />
        </div> 
        }
      </UserContext.Provider>
    </main>
  );
}
