import { db } from "../app";
import { getFirestore, doc, setDoc, collection, query, getDocs, updateDoc } from "firebase/firestore";

import { ActivityInterface } from "@/app/interfaces";

export async function getDay(user, date){
    //test if date is valid
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)){
        return null;
    }

    try{
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const res = await getDocs(q);

        if(!res.empty){
            for (const doc of res.docs) {
                const obj = doc.data()
                
                if(obj?.email === user){
                    return obj.days[date];
                }
            }

            return null
        }

        return null;
    } catch(error){
        console.log(error);

        return null;
    }
}

export async function addData(activityObj, user) {
    try {
        const usersRef = collection(db, 'users')
        const q = query(usersRef);
        const res = await getDocs(q);

        //either empty obj or contains all the events already defined for that day
        let currentDayData = {};
        let currentDaysData = [];
        const setDate = activityObj.date;

        if(!res.empty){
            for (const doc of res.docs) {
                const obj = doc.data()
                
                if(obj?.email === user){
                    currentDaysData = obj.days ? obj.days : [];
                    currentDayData = obj.days[setDate] ? obj.days[setDate] : {};
                }
            }
        }

        const updatedDayData = [
            ...(Object.keys(currentDayData).length > 0 ? currentDayData : []),
          {
            type: activityObj.type,
            duration: activityObj.duration,
            description: activityObj.description
          }
        ];

        const updatedDaysData = {
            ...currentDaysData,
            [setDate]: updatedDayData
        }

        //collection users, document <user>, map days. Days.put(date, updatedDayData)
        const userRef = doc(db, "users", user);
     
        await updateDoc(userRef, {
            days: updatedDaysData
        })
      } catch (error) {
        console.error('Error adding data:', error);
      }
}
