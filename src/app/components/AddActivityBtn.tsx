import styles from './AddActivityBtn.module.css'

import { ActivityInterface } from '../interfaces';
import { UserContext } from '../context';

import { useState, FormEvent, useContext } from 'react'

import { addData } from '@/firebase/firestore/crud';

interface AddActivityPopupInterface {
    onClickFunc: () => void
}

function AddActivityPopup(props: AddActivityPopupInterface) {
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState('');

    const user = useContext(UserContext);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formVals: any = {};
        formData.forEach((value, key) => {
            formVals[key] = value;
        });
        
        const submitObj = formVals as ActivityInterface;
        user && addData(submitObj, user.email);
    }

    return(
        <form className={styles['add-activity-popup']} onSubmit={handleSubmit}>
            <label htmlFor="type">Type:</label>
            <input 
                type="text" 
                id="type" 
                name="type"
                value={type} 
                onChange={(e) => setType(e.target.value)} 
            />
            <label htmlFor="desc">Description:</label>
            <input 
                type="text" 
                id="desc" 
                name="description"
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
            />
            <label htmlFor="duration">Duration (m):</label>
            <input 
                type="number" 
                id="duration" 
                name="duration"
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))} 
            />
            <label htmlFor="date">Date:</label>
            <input 
                type="date" 
                id="date" 
                name="date"
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
            />
            <div className={styles['add-activity-btns-cont']}>
                <button type="submit">Add</button>
                <button onClick={props.onClickFunc}>Cancel</button>
            </div>
        </form>
    )
}

export default function AddActivityBtn() {
    const [popup, setPopup] = useState(false);

    return(
        <>  
            {!popup ? <button className={styles['add-activity-btn']} onClick={() => setPopup(true)}>+</button> : null}
            {popup ? <AddActivityPopup onClickFunc={() => setPopup(false)}/> : null}
        </>
    )   
}