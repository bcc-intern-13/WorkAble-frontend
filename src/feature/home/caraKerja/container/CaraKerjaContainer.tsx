import React from 'react'
import LangkahKerja from '../components/LangkahKerja'
import { langkahKerjaData } from '../data/langkahKerjaData'

const CaraKerjaContainer = () => {
  return (
    <section className='w-full flex flex-col justify-center items-center text-center gap-12 md:gap-18 py-20 px-4'>
        <div className='space-y-4'>
            <h3 className='body-semibold text-secondary'>
                CARA KERJA
            </h3>
            <div className='flex items-center justify-center text-center'>
                <h2 className='text-3xl font-bold md:h2-semibold text-black'>
                    4 Langkah 
                </h2>
                <p className='text-3xl font-bold md:h2-semibold text-secondary'> Kerja</p>
            </div>
            <p className='w-full max-w-lg mx-auto md:caption-regular text-[#757575] leading-relaxed'>
                Dari daftar hingga mendapat panggilan kerja — semuanya di satu tempat.
            </p>
        </div>

        <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-12 lg:px-20'>
            {langkahKerjaData.map((langkahKerjaData) => (
                <LangkahKerja key={langkahKerjaData.no} langkahKerjaData={langkahKerjaData}/>
            ))}.
        </div>
    </section>
  )
}

export default CaraKerjaContainer