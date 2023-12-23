import Image from 'next/image'
import { Inter } from 'next/font/google'
import Main from '@/components/main/Main'
import Header from '@/components/layout/Header'
import gsap from "gsap";

const inter = Inter({ subsets: ['latin'] })

export default function Work() {
  return (
    <main>
      <Header/>
      <Main/>
    </main>
  )
}