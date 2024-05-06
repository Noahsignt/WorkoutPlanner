import styles from './AddActivityBtn.module.css'

import { useState } from 'react'

interface AddActivityPopupInterface {
    onClickFunc: () => void
}

function AddActivityPopup(props: AddActivityPopupInterface) {
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState('');

    return(
        <form className={styles['add-activity-popup']}>
            <label htmlFor="type">Type:</label>
            <input 
                type="text" 
                id="type" 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
            />
            <label htmlFor="desc">Description:</label>
            <input 
                type="text" 
                id="desc" 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
            />
            <label htmlFor="duration">Duration (m):</label>
            <input 
                type="number" 
                id="duration" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))} 
            />
            <label htmlFor="date">Date:</label>
            <input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
            />
            <div className={styles['add-activity-btns-cont']}>
                <button>Add</button>
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