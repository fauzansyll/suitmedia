import style from '@/styles/idea/Main.module.scss'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Main(){

    return(
        <div className={`${style.main}`}>
          <h1>Ideas</h1>
        </div>
    )
}