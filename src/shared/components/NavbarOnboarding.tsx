"use client"

import { ArrowDownIcon, ChevronDown } from 'lucide-react'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { TOTAL_STEPS } from '@/feature/_user/onboarding/container/OnboardingContainer'
import Image from 'next/image'
import React from 'react'
import SearchBar from './SearchBar'

const NavOnboarding = () => {
  const {currentStep} = useOnboardingStore()

  return (
    <nav className={'bg-white fixed right-0 left-0 top-0 z-10 transition-all duration-300 shadow-md shadow-[#007BFF40]'}>
        <div className='mycontainer py-4 flex items-center justify-between'>
            <div className='w-40 h-14'>
                <Image src={"/Logo.webp"} alt='LogoNav' width={500} height={500}/>
            </div>

            <div>
                <div className="ml-auto text-sm text-gray-600 font-medium">
                Langkah {currentStep} dari {TOTAL_STEPS}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavOnboarding