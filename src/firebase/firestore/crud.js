import { db } from "../app";
import { getFirestore, doc, setDoc, collection, query, getDocs, updateDoc } from "firebase/firestore";
import { activityEquals, getDateRange } from "@/library/util";

//returns a list of activities falling within the specified time range
export async function getDays(user, dateOne, dateTwo){
    //test if date is valid
    if(!/^\d{4}-\d{2}-\d{2}$/.test(dateOne) || !/^\d{4}-\d{2}-\d{2}$/.test(dateTwo)){
        return null;
    }

    //need to create a list of dates between (inclusive) the first and second.
    const range = getDateRange(dateOne, dateTwo);
    const activities = []

    try{
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const res = await getDocs(q);

        if(!res.empty){
            for (const doc of res.docs) {
                const obj = doc.data()
                
                if(obj?.email === user){
                    console.log(obj.days);
                    range.forEach(date => {
                        if(obj.days[date]){
                            activities.push(...obj.days[date]);
                        }
                    })

                    return activities;
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

export async function deleteActivity(user, activityObj) {
    try {
        const usersRef = collection(db, 'users')
        const q = query(usersRef);
        const res = await getDocs(q);

        //either empty obj or contains all the events already defined for that day
        let currentDayData = [];
        let currentDaysData = [];
        const setDate = activityObj.date;

        if(!res.empty){
            for (const doc of res.docs) {
                const obj = doc.data()
                
                if(obj?.email === user.email){
                    currentDaysData = obj.days ? obj.days : {};
                    currentDayData = obj.days[setDate] ? obj.days[setDate] : [];
                }
            }
        }

        const updatedDayData = currentDayData.filter((e) => !activityEquals(e, activityObj));

        const updatedDaysData = {
            ...currentDaysData,
            [setDate]: updatedDayData
        }

        //collection users, document <user>, map days. Days.put(date, updatedDayData)
        const userRef = doc(db, "users", user.email);

        await updateDoc(userRef, {
            days: updatedDaysData
        })
    } catch (error) {
        console.error('Error deleting data:', error);
      }
}