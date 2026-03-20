import React from 'react'
import MengapaCard from '../components/MengapaCard'

const MengapaContainer = () => {
  return (
    <section className='flex flex-col justify-center items-center text-center gap-8 mx-20'>
        <div className='space-y-2'>
            <h3 className='body-semibold text-secondary'>
                MENGAPA WORKABLE
            </h3>
            <div className='flex items-center justify-center text-center'>
                <h2 className='h2-semibold text-black'>
                    Dirancang untuk 
                </h2>
                <p className='h2-semibold text-secondary'>kamu</p>
            </div>
            <p className='w-128 caption-regular text-[#757575]'>
                Bukan sekadar job board. WorkAble adalah platform yang memahami kebutuhan unikmu sejak langkah pertama.
            </p>
        </div>
            
        <div>
            <MengapaCard/>
        </div>
    </section>
  )
}

export default MengapaContainer