import { db } from "../app";
import { getFirestore, doc, setDoc, collection, query, getDocs } from "firebase/firestore";

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

async function addData(collection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}
