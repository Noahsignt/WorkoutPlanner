import { ActivityInterface } from '../interfaces'
import { deleteActivity } from '@/firebase/firestore/crud'
import { UserContext } from '../context';

import { useContext } from 'react';

import styles from './Activity.module.css'

interface ActivityPropsInterface extends ActivityInterface {
  deleteSelf: (activity : ActivityInterface) => void
}

export default function Activity(props: ActivityPropsInterface) {
  const user = useContext(UserContext);

  const onClickClose = () => {
    deleteActivity(user, props);
    props.deleteSelf(props);
  }

  const TimerSVG = (props : any) => (
      <svg
        className={styles['activity-timer']}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 296.228 296.228"
        {...props}
      >
        <path d="M167.364 48.003V25h10.5c6.903 0 12.5-5.597 12.5-12.5S184.768 0 177.864 0h-59.5c-6.903 0-12.5 5.597-12.5 12.5s5.597 12.5 12.5 12.5h10.5v23.003C69.126 57.288 23.26 109.074 23.26 171.373c0 68.845 56.01 124.854 124.854 124.854s124.854-56.01 124.854-124.854c0-62.299-45.866-114.085-105.604-123.37zm-19.25 223.225c-55.06 0-99.854-44.795-99.854-99.854S93.055 71.52 148.114 71.52s99.854 44.795 99.854 99.854-44.794 99.854-99.854 99.854z" />
        <path d="M160.614 166.18v-58.889c0-6.903-5.597-12.5-12.5-12.5s-12.5 5.597-12.5 12.5v66.1c0 2.033.81 3.982 2.25 5.416l34.969 34.822c4.893 4.872 12.806 4.854 17.678-.037 4.871-4.892 4.854-12.807-.037-17.678l-29.86-29.734z" />
      </svg>
    )

  const convertTime = (minutes: number) : string => {
    if(minutes <= 60){
      return `${minutes}m`
    } else {
      return `${Math.floor(minutes/60)}h${minutes%60 ? `${minutes%60}m` : ''}`
    }
  }

  return (
      <div className={styles['activity']}>
          <button onClick={() => onClickClose()}>x</button>
          <p className={styles['activity-date']}>{props.date}</p>
          <h1 className={styles['activity-type']}>{props.type}</h1>
          <div className={styles['activity-info']}>
              <h2>{convertTime(props.duration)}</h2>
              <TimerSVG />
          </div>
          <p className={styles['activity-desc']}><i>Desc: </i>{props.description}</p>
      </div>
  )
}