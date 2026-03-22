import { ArrowDownIcon, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SearchBar from './SearchBar'

const NavLogin = () => {
  return (
    <nav className={'bg-white fixed right-0 left-0 top-0 z-10 transition-all duration-300 shadow-md shadow-[#007BFF40]'}>
        <div className='mycontainer py-4 flex items-center justify-between'>
            <div className='w-40 h-11'>
                <Image src={"/Logo.webp"} alt='LogoNav' width={500} height={500}/>
            </div>

            <div>
                <SearchBar/>
            </div>

            <div className='flex items-center justify-between gap-2 py-1 px-2 border border-[#D9D9D9] rounded-full cursor-pointer hover:bg-gray-200'>
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
        </div>
    </nav>
  )
}

export default NavLogin