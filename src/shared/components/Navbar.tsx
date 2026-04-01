"use client"

import { Button } from '@/components/ui/atoms/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={'bg-white fixed right-0 left-0 top-0 z-10 transition-all duration-300 shadow-md shadow-[#007BFF40]'}>
      <div className='mycontainer flex items-center justify-between'>
        <div className='w-40 h-14'>
          <Image src={"/Logo.webp"} alt='LogoNav' width={500} height={500}/>
        </div>
        
        <div className='hidden md:block'>
            <ul className='flex items-center justify-between gap-6 text-lg'>
                <li>
                    <Link 
                      href="#mengapa" 
                      onClick={(e) => handleSmoothScroll(e, 'mengapa')}
                      className='caption-regular hover:text-secondary transition-colors'
                    >
                      Mengapa Workable
                    </Link>
                </li>
                <li>
                    <Link 
                      href="#caraKerja" 
                      onClick={(e) => handleSmoothScroll(e, 'caraKerja')}
                      className='caption-regular hover:text-secondary transition-colors'
                    >
                      Cara Kerja
                    </Link>
                </li>
                <li>
                    <Link 
                      href="#mitra" 
                      onClick={(e) => handleSmoothScroll(e, 'mitra')}
                      className='caption-regular hover:text-secondary transition-colors'
                    >
                      Mitra
                    </Link>
                </li>
            </ul>
        </div>

        <div className='flex gap-1 md:gap-2'>
          <Link href={"/login"}>
            <Button variant={"login"} size={"default"}>Masuk</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant={"nav"} size={"default"} className='gap-2'>
              Daftar Gratis 
              <ArrowRight/>
            </Button>
          </Link>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar