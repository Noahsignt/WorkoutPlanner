import { Activity } from '../interfaces'

import styles from './Activity.module.css'

interface propInterface {
    activity: Activity,
    showDate: boolean,
    date?: string
}

export default function Activity(props: propInterface) {
    return (
        <div className={styles['activity']}>
        </div>
    )
}