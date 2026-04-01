"use client"

import { ArrowDownIcon, ChevronDown, Home, Hotel, Hourglass, HouseHeart, HousePlug, HousePlus, HouseWifi, LucideHome } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLogin = () => {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };


  return (
    <nav className={'bg-white fixed right-0 left-0 top-0 z-10 transition-all duration-300 shadow-md shadow-[#007BFF40]'}>
        <div className='mycontainer py-4 flex items-center justify-between'>
            <div className='flex items-center justify-center gap-4'>
                <div className='w-40 h-14'>
                    <Image src={"/Logo.webp"} alt='LogoNav' width={500} height={500}/>
                </div>
            </div>

            <div className='hidden md:block'>
                <ul className='flex items-center justify-between gap-2'>
                    <li className=''>
                        <Link 
                        href={"/beranda"} 
                        className={`py-4 px-2 hover:bg-gray-100 hover:shadow-lg hover:border-b-2 hover:border-b-[#252525] flex items-center gap-2 text-[#000000] text-base font-medium transition-transform duration-300  ${pathname === "/beranda" ? "border-b-2 border-b-[#252525] font-semibold" : "text-[#000000]"}`}
                        >
                            <Image src={"/HomeIcon.svg"} alt='HomeIcon' width={500} height={500} className='w-5 h-5'/>
                            Beranda
                        </Link>
                    </li>
                    <li className=''>
                        <Link 
                        href={"/cariLowongan"} 
                        className={`py-4 px-2 hover:bg-gray-100 hover:shadow-lg hover:border-b-2 hover:border-b-[#252525] flex items-center gap-2 text-[#000000] text-base font-medium transition-transform duration-300   ${pathname === "/cariLowongan" ? "border-b-2 border-b-[#252525] font-semibold" : "text-[#000000]"}`}
                        >
                            <Image src={"/SearchIcon.svg"} alt='HomeIcon' width={500} height={500} className='w-5 h-5'/>
                            Cari Lowongan
                        </Link>
                    </li>
                    <li className=''>
                        <Link 
                        href={"/lamaran"} 
                        className={`py-4 px-2 hover:bg-gray-100 hover:shadow-lg hover:border-b-2 hover:border-b-[#252525] flex items-center gap-2 text-[#000000] text-base font-medium transition-transform duration-300   ${pathname === "/lamaran" ? "border-b-2 border-b-[#252525] font-semibold" : "text-[#000000]"}`}
                        >
                            <Image src={"/LamaranIcon.svg"} alt='HomeIcon' width={500} height={500} className='w-5 h-5'/>
                            Lamaran
                        </Link>
                    </li>
                    
                </ul>
            </div>

            <div className='hidden md:flex items-center justify-between gap-2 py-1 px-2 border border-[#D9D9D9] rounded-full cursor-pointer hover:bg-gray-200'>
                <div className='w-11 h-11 rounded-full  bg-[#D9D9D9]'>
                    .
                </div>
                <div className='pr-8'>
                    <h4 className='text-secondary font-semibold text-base'>
                        SMART PROFILE
                    </h4>
                    <p className='font-semibold text-base'>
                        Username
                    </p>
                </div>
                <div>
                    <ChevronDown/>
                </div>
            </div>

            <button
            className="pointer-events-auto md:hidden flex flex-col items-center justify-center w-14.5 h-14.5 rounded-2xl border border-secondary-bl-09 bg-white cursor-pointer z-50 ml-auto transition-transform hover:scale-105 shadow-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            >
            <span
                className={`block w-6 h-[2.5px] bg-secondary-bl-09 rounded-full transition-all duration-300 ease-in-out ${isMobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
                className={`block w-6 h-[2.5px] bg-secondary-bl-09 rounded-full transition-all duration-300 ease-in-out mt-1 ${isMobileOpen ? "opacity-0" : ""}`}
            />
            <span
                className={`block w-6 h-[2.5px] bg-secondary-bl-09 rounded-full transition-all duration-300 ease-in-out mt-1 ${isMobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
            </button>

            <div className={`md:hidden absolute top-24 right-0 max-w-md bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isMobileOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
                <ul className='flex flex-col gap-2'>
                    <li>
                        <Link 
                        href={"/beranda"} 
                        className={`w-full py-4 px-2 rounded-t-lg hover:bg-gray-100 hover:shadow-lg hover:border-b-2 hover:border-b-[#252525] flex items-center gap-2 text-[#000000] text-base font-medium transition-transform duration-300  ${pathname === "/beranda" ? "bg-gray-200" : "text-[#000000]"}`}
                        >
                            <Image src={"/HomeIcon.svg"} alt='HomeIcon' width={500} height={500} className='w-5 h-5'/>
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link 
                        href={"/cariLowongan"} 
                        className={`w-full py-4 px-2  hover:bg-gray-100 hover:shadow-lg hover:border-b-2 hover:border-b-[#252525] flex items-center gap-2 text-[#000000] text-base font-medium transition-transform duration-300   ${pathname === "/cariLowongan" ? "bg-gray-200" : "text-[#000000]"}`}
                        >
                            <Image src={"/SearchIcon.svg"} alt='HomeIcon' width={500} height={500} className='w-5 h-5'/>
                            Cari Lowongan
                        </Link>
                    </li>
                    <li>
                        <Link 
                        href={"/lamaran"} 
                        className={`py-4 px-2 hover:bg-gray-100 hover:shadow-lg hover:border-b-2 hover:border-b-[#252525] flex items-center gap-2 text-[#000000] text-base font-medium transition-transform duration-300   ${pathname === "/lamaran" ? "bg-gray-200" : "text-[#000000]"}`}
                        >
                            <Image src={"/LamaranIcon.svg"} alt='HomeIcon' width={500} height={500} className='w-5 h-5'/>
                            Lamaran
                        </Link>
                    </li>
                    <div className='items-center justify-between gap-2 py-1 px-2 border border-[#D9D9D9] rounded-full cursor-pointer hover:bg-gray-200'>
                        <div className='w-11 h-11 rounded-full  bg-[#D9D9D9]'>
                            .
                        </div>
                        <div className='pr-8'>
                            <p className='font-semibold text-base'>
                                Username
                            </p>
                        </div>
                        <div>
                            <ChevronDown/>
                        </div>
                    </div>
                    
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavLogin