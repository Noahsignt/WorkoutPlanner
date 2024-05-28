'use client'
import { useEffect, useState } from "react";
import { UserContext } from "./context";
import { ActivityInterface, UserInterface } from "./interfaces";
import { activityEquals } from "@/library/util";

import UserForm from "./components/UserForm";
import Header from "./components/Header";
import InfoBloc from "./components/InfoBloc";
import Activity from "./components/Activity";
import AddActivityBtn from "./components/AddActivityBtn";

import { auth } from "@/firebase/app";
import { getDays } from "../firebase/firestore/crud"
import { onUserChange } from "../firebase/auth/info"

import styles from "./page.module.css";
import { render } from "react-dom";

export default function Home() {  
  const currentDate = new Date();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [activities, setActivities] = useState<ActivityInterface[]>([]);
  //slice is always just the year, month and day in iso string format
  const [slice, setSlice] = useState([currentDate.toISOString().slice(0, 10), currentDate.toISOString().slice(0, 10)])
  //need to rerender when AddActivityBtn popup status changes
  const [createPopup, setCreatePopup] = useState(false);

  useEffect(() => {
    onUserChange((e : UserInterface) => {
      setUser(e);

      getDays(e?.email, slice[0], slice[1]).then(data => {
        if(!data){
          return;
        }
        //add date to activities
        setActivities(data.map((e : any) => ({...e, date: slice[0]})));
      }).catch((error) => {
        console.log(error);
      })
    });
  }, [])

  useEffect(() => {
    getDays(user?.email, slice[0], slice[1]).then(data => {
      if(!data){
        return;
      }
      //add date to activities
      setActivities(data.map((e : any) => ({...e, date: slice[0]})));
    }).catch((error) => {
      console.log(error);
    })
  }, [createPopup, slice])

  const setPopup = (newVal: boolean) => {
    setCreatePopup(newVal);
  }

  const deleteActivity = (activity: ActivityInterface) => {
    setActivities(activities.filter(e => !(activityEquals(e, activity))));
  }

  const renderActivities = () => {
    return(
      activities.map((e, idx) => {
        return <Activity description={e.description} type={e.type} duration={e.duration} date={e.date} key={idx} deleteSelf={deleteActivity}/>
      })
    )
  }

  return (
    <main>  
      <UserContext.Provider value={user}>
        <Header />
        {user ? 
        <div className={styles['home-main-user']}>
          <div className={styles['home-main-slice-picker']}>
          <input 
                type="date" 
                name="type"
                value={slice[0]} 
                onChange={(e) => setSlice([e.target.value, slice[1]])} 
            /> -
            <input 
                type="date" 
                value={slice[1]} 
                onChange={(e) => setSlice([slice[0], e.target.value])} 
            />
          </div>
          {renderActivities()}
          <AddActivityBtn popup={createPopup} setPopup={setPopup}/>
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
