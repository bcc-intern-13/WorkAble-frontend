import React from 'react'
import HeaderBeranda from '../components/HeaderBeranda'
import RekomendasiLamaran from '../components/RekomendasiLamaran'
import LamaranBeranda from '../components/LamaranBeranda'

const BerandaContainer = () => {
  return (
    <div className='pt-34 w-screen flex justify-between gap-4 px-4 md:px-20'>
        <div className='w-2/3 space-y-8 '>
            <HeaderBeranda/>
            <RekomendasiLamaran/>
        </div>

        <div className='w-1/3'>
            <LamaranBeranda/>
        </div>
    </div>
  )
}

export default BerandaContainer