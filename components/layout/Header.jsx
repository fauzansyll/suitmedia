import style from '@/styles/layout/Header.module.scss'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from 'next/router';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function Header(){
    const navbarRef = useRef(null);
    const router = useRouter();
    
    const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      if (visible) {
        gsap.to(navbarRef.current, {
          duration: 0.3,
          opacity: 1,
          y: 0,
        });
      } else {
        gsap.to(navbarRef.current, {
          duration: 0.3,
          opacity: 0,
          y: '-100%',
        });
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
//     const navbarRef = useRef(null);
    const [activePage, setActivePage] = useState('home');

    const changeActivePage = (pageName) => {
        setActivePage(pageName);
    }
//   useEffect(()=>{
//     let ctx = gsap.context(() =>{
//         let itemsTimeline = gsap.timeline({
//             scrollTrigger: {
//                 trigger: navbarRef.current,
//                 start : "top top",
//                 end: "bottom top",
//                 scrub: true,
//                 markers: true,

//             },
//         });
//         itemsTimeline.fromTo(
//             navbarRef.current,
//             {
                
//                 opacity: 1,
//             },
//             {
                
//                 opacity: 0,
//             },
//         )
//     });
//     return () => ctx.revert();
//   }, []);
    
    return(
        <div ref={navbarRef} className={`${style.main}`}>
            <div className={`${style.logo}`}>
                <Image
                 src={'/suitmedia.png'}
                 width={120}
                 height={120}
                 alt='Logo' 
                />
            </div>
            <div className={`${style.links}`}>
            <p onClick={() => changeActivePage('work')} className={activePage === 'work' ? `${style.active}` : `` }
                >
                <Link onClick={() => router.push('/work')} href={'/work'}>Work</Link>
                </p>
                <p onClick={() => changeActivePage('about')} className={activePage === 'about' ? `${style.active}` : `` }
                >
                <Link onClick={() => router.push('/about')} href={'/about'}>About</Link>
                </p>
                <p onClick={() => changeActivePage('services')} className={activePage === 'services' ? `${style.active}` : `` }
                >
                <Link href={'/services'}>Services</Link>
                </p>
                <p onClick={() => {
                  changeActivePage('ideas');
                  router.push('/ideas');
                }} className={activePage === 'ideas' ? `${style.active}` : ``}>
                  Ideas
                </p>
                <p onClick={() => changeActivePage('careers')} className={activePage === 'careers' ? `${style.active}` : `` }
                >
                <Link href={'/careers'}>Careers</Link>
                </p>
                <p onClick={() => changeActivePage('contact')} className={activePage === 'contact' ? `${style.active}` : `` }
                >
                <Link href={'/contact'}>Contact</Link>
                </p>
            </div>
        </div>

    )
}