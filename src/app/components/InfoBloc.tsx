import styles from './InfoBloc.module.css'
import Image from 'next/image'

export default function InfoBloc({title='', text='', flavour='', src='', alt=''}){
    return(
        <div className={styles['info-bloc']}>
            <div className={styles['info-bloc-text']}>
                <h2 className={styles['info-bloc-flavour']}>{flavour}</h2>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
            <Image src={src} alt={alt} width="300" height="225"/>
        </div>
    )
}