import React from 'react'
import MitraButton from '../components/MitraButton'

const MitraContainer = () => {
  return (
    <section className='w-full py-20 md:h-132 bg-secondary flex flex-col items-center justify-center gap-8 px-4'>
        <div className='flex flex-col items-center justify-center text-center max-w-3xl mx-auto'>
            <h2 className='text-4xl md:h1-semibold text-white font-bold mb-4'>
                Mulai perjalanan kariermu hari ini
            </h2>
            <p className='text-white text-base md:body-regular leading-relaxed'>
                Gratis selamanya. Tanpa kartu kredit. Daftar dalam 2 menit.
            </p>
        </div>

        <div>
            <MitraButton/>
        </div>
    </section>
  )
}

export default MitraContainer