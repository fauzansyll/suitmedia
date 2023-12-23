import style from '@/styles/idea/Main.module.scss'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Main(){

    return(
        <div className={`${style.main}`}>
            <Image
            src={'/bg.jpg'}
            width={100}
            height={100}
            alt='Banner'
            className={style.parallaxImage}
            />
        </div>
    )
}