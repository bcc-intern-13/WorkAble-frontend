import { Button } from '@/components/ui/atoms/button'
import React from 'react'

const Hero = () => {
  return (
    <section className='relative'>
        <div className='h-screen w-full flex flex-col justify-center items-center gap-2 px-4'>

            <div className='w-full max-w-lg px-8 py-1 text-center border-2 border-secondary rounded-full'>
                <h2 className='text-sm font-semibold md:body-semibold text-secondary'>
                    PLATFORM KARIER INKLUSIF #1 DI INDONESIA
                </h2>
            </div>

            <div className='max-w-lg  text-center text-black mb-2'>
                <h1 className='text-5xl font-bold md:h1-bold'>
                    Break Your Limits
                </h1>
                <p className='text-sm md:caption-regular'>
                    WorkAble menghubungkan pencari kerja dengan ribuan perusahaan inklusif yang menghargai talenta — bukan menilai dari hal lain.
                </p>
            </div>

            <div className='flex gap-2 mb-6'>
                <Button variant={'default'} size={'default'}>Daftar gratis sekarang</Button>
                <Button variant={'black'} size={'default'}>Sudah punya akun? Masuk</Button>
            </div>

            <div className='flex gap-4 md:gap-18 max-w-lg'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-4xl font-bold md:h2-bold text-secondary'>
                        12K+
                    </h2>
                    <p className='caption-semibold text-[#757575]'>
                        Pencari Kerja
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-4xl font-bold md:h2-bold text-secondary'>
                        800+
                    </h2>
                    <p className='caption-semibold text-[#757575]'>
                        Perubahan inklusif
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-4xl font-bold md:h2-bold text-secondary'>
                        4.500+
                    </h2>
                    <p className='caption-semibold text-[#757575]'>
                        Lowongan Aktif
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero