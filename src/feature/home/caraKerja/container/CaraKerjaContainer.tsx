import React from 'react'
import LangkahKerja from '../components/LangkahKerja'
import { langkahKerjaData } from '../data/langkahKerjaData'

const CaraKerjaContainer = () => {
  return (
    <section className='flex flex-col justify-center items-center text-center gap-18 my-34'>
        <div className='space-y-2'>
            <h3 className='body-semibold text-secondary'>
                CARA KERJA
            </h3>
            <div className='flex items-center justify-center text-center'>
                <h2 className='h2-semibold text-black'>
                    4 Langkah 
                </h2>
                <p className='h2-semibold text-secondary'> Kerja</p>
            </div>
            <p className='w-128 caption-regular text-[#757575]'>
                Dari daftar hingga mendapat panggilan kerja — semuanya di satu tempat.
            </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mx-20'>
            {langkahKerjaData.map((langkahKerjaData) => (
                <LangkahKerja key={langkahKerjaData.no} langkahKerjaData={langkahKerjaData}/>
            ))}.
        </div>
    </section>
  )
}

export default CaraKerjaContainer