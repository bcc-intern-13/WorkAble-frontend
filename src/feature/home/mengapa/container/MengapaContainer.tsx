import React from 'react'
import MengapaCard from '../components/MengapaCard'

const MengapaContainer = () => {
  return (
    <section className='w-full flex items-center justify-center px-4'>
        <div className='max-w-lg md:max-w-6xl flex flex-col justify-center items-center text-center gap-8'>
            <div className='space-y-2'>
                <h3 className='body-semibold text-secondary'>
                    MENGAPA WORKABLE
                </h3>
                <div className='flex items-center justify-center text-center'>
                    <h2 className='text-3xl font-bold md:h2-semibold text-black'>
                        Dirancang untuk 
                    </h2>
                    <p className='text-3xl font-bold md:h2-semibold text-secondary'>kamu</p>
                </div>
                <p className='text-sm md:caption-regular leading-relaxed text-[#757575]'>
                    Bukan sekadar job board. WorkAble adalah platform yang memahami kebutuhan unikmu sejak langkah pertama.
                </p>
            </div>
                
            <div>
                <MengapaCard/>
            </div>
        </div>
    </section>
  )
}

export default MengapaContainer