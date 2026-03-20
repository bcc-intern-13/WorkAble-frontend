import React from 'react'
import MitraButton from '../components/MitraButton'

const MitraContainer = () => {
  return (
    <section className='w-full h-132 bg-secondary flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-col items-center justify-center'>
            <h2 className='h1-semibold text-white'>
                Mulai perjalanan kariermu hari ini
            </h2>
            <p className='text-white body-regular'>
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