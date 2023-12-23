import Image from 'next/image'
import { Inter } from 'next/font/google'
import Main from '@/components/ideas/Main'
import Header from '@/components/layout/Header'
import gsap from "gsap";
import ListPost from '@/components/ideas/Paginate'

const inter = Inter({ subsets: ['latin'] })

export default function Ideas() {
  return (
    <main>
      <Header/>
      <ListPost/>
      <Main/>
    </main>
  )
}